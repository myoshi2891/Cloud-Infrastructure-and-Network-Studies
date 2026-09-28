#!/usr/bin/env node
/**
 * scripts/check-zombie-tests.mjs
 *
 * ゾンビ（孤立・暴走）プロセスを検出し、警告する診断スクリプト。
 *
 * 検出対象:
 *   1. `bun test` を直接実行したプロセス（Vitest 未経由の誤実行。`bun run test:md-to-html` 配下は除外）
 *   2. CPU 時間が 60 分超の `bun` / `node` プロセス（長時間ハング候補）
 *   3. `bash -c` / `zsh -c` のインラインコマンドで `while true` を実行し、親から切り離されたもの（ストレステスト残骸候補）
 *      ※ スクリプト内の `(while true; ...) &` サブシェルは親の argv を継承し args にループ本文が現れないため、
 *        記録した PID と親プロセス状態で確認する（.agents/rules/process-hygiene.md §2-2）
 *
 * 使用方法:
 *   bun run test:check-zombies
 */

import { execSync } from 'node:child_process';

const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

/**
 * ps コマンドで全プロセス情報を取得する。
 * @returns {{ pid: string, ppid: string, pcpu: string, cputimeSeconds: number, args: string }[]}
 */
function getAllProcesses() {
  try {
    // 既定の maxBuffer（1 MiB）ではプロセス数が多い環境で ENOBUFS になるため拡張する
    const raw = execSync('ps -eo pid,ppid,pcpu,cputime,args', {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
    const lines = raw.trim().split('\n').slice(1); // ヘッダ除去
    return lines.map((line) => {
      const cols = line.trim().split(/\s+/);
      const pid = cols[0] ?? '';
      const ppid = cols[1] ?? '';
      const pcpu = cols[2] ?? '0';
      const cputime = cols[3] ?? '00:00:00';
      const args = cols.slice(4).join(' ');
      return { pid, ppid, pcpu, cputimeSeconds: parseCputime(cputime), args };
    });
  } catch {
    console.error(`${RED}ERROR: ps コマンドが実行できませんでした。macOS 環境で実行してください。${RESET}`);
    process.exit(1);
  }
}

/**
 * cputime 文字列を秒数（整数）に変換する。
 * 対応形式:
 *   - macOS:  MM:SS.ss（分は 60 を超えうる。例 `993:17.76`）
 *   - procps: [DD-]HH:MM:SS（例 `1-02:03:04`）
 * 解釈できない形式は 0 を返す。
 * @param {string} cputime
 * @returns {number}
 */
function parseCputime(cputime) {
  const match = /^(?:(\d+)-)?(?:(\d+):)?(\d+):(\d+(?:\.\d+)?)$/.exec(cputime.trim());
  if (!match) return 0;
  const [, days = '0', hours = '0', minutes = '0', seconds = '0'] = match;
  return Math.floor(
    Number(days) * 86400 + Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds),
  );
}

/**
 * 秒数を人間が読みやすい文字列に変換する。
 * @param {number} seconds
 * @returns {string}
 */
function formatSeconds(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}時間${m}分${s}秒`;
  if (m > 0) return `${m}分${s}秒`;
  return `${s}秒`;
}

/**
 * コマンドラインを「実行ファイルの basename + 残りの引数」に分解する。
 * @param {string} args
 * @returns {{ executable: string, rest: string[] }}
 */
function parseCommand(args) {
  const [first = '', ...rest] = args.trim().split(/\s+/);
  return { executable: first.split('/').pop() ?? '', rest };
}

const processes = getAllProcesses();
const processByPid = new Map(processes.map((p) => [p.pid, p]));
const issues = [];

/**
 * 祖先プロセスを親から順に列挙する（循環・欠落で停止）。
 * @param {{ ppid: string }} p
 * @returns {{ pid: string, ppid: string, args: string }[]}
 */
function getAncestors(p) {
  const ancestors = [];
  const visited = new Set();
  let current = processByPid.get(p.ppid);
  while (current && !visited.has(current.pid)) {
    visited.add(current.pid);
    ancestors.push(current);
    current = processByPid.get(current.ppid);
  }
  return ancestors;
}

/**
 * 正規ラッパー `bun run test:md-to-html` そのものか（完全一致）。
 * @param {string} args
 * @returns {boolean}
 */
function isMdToHtmlWrapper(args) {
  const { executable, rest } = parseCommand(args);
  return executable === 'bun' && rest.length === 2 && rest[0] === 'run' && rest[1] === 'test:md-to-html';
}

// ─────────────────────────────────────────────
// 検出 1: `bun test` の直接実行（引数・パスを問わない）
// ─────────────────────────────────────────────
const bunTestMisuse = processes.filter((p) => {
  const { executable, rest } = parseCommand(p.args);
  if (executable !== 'bun' || rest[0] !== 'test') return false;
  // `bun run test:md-to-html` 配下で起動されたものだけを許可
  return !getAncestors(p).some((a) => isMdToHtmlWrapper(a.args));
});
for (const p of bunTestMisuse) {
  issues.push({
    severity: 'ERROR',
    pid: p.pid,
    cputimeSeconds: p.cputimeSeconds,
    reason: '`bun test` の直接実行（Vitest 未経由の誤実行）— CPU ハングの危険',
    args: p.args,
  });
}

// ─────────────────────────────────────────────
// 検出 2: CPU 時間 60 分超の bun / node プロセス
// ─────────────────────────────────────────────
const LONG_RUNNING_THRESHOLD_SEC = 60 * 60; // 60 分
const longRunning = processes.filter(
  (p) =>
    p.cputimeSeconds > LONG_RUNNING_THRESHOLD_SEC &&
    (/\/bun\b/.test(p.args) || /\bbun\b/.test(p.args) || /\bnode\b/.test(p.args)) &&
    !bunTestMisuse.some((b) => b.pid === p.pid), // 重複除去
);
for (const p of longRunning) {
  issues.push({
    severity: 'WARN',
    pid: p.pid,
    cputimeSeconds: p.cputimeSeconds,
    reason: `長時間実行中の bun/node プロセス（CPU 時間: ${formatSeconds(p.cputimeSeconds)}）`,
    args: p.args,
  });
}

// ─────────────────────────────────────────────
// 検出 3: インラインコマンドの `while true` を実行する zsh/bash プロセス（親から切り離されたもののみ）
// ─────────────────────────────────────────────
const SHELL_EXECUTABLES = new Set(['bash', 'zsh']);

/**
 * 親が生存しており監視下にあるか。孤立プロセスは PID 1（launchd/init）へ付け替えられる。
 * @param {{ ppid: string }} p
 * @returns {boolean}
 */
function isSupervised(p) {
  return p.ppid !== '1' && p.ppid !== '0' && processByPid.has(p.ppid);
}

/** コマンド位置（先頭・区切り記号・do/then/else の直後）にある `while true` */
const LOOP_AT_COMMAND_POSITION = /(?:^|[;&|({]\s*|\b(?:do|then|else)\s+)while\s+true\b/;

/**
 * `-c`（`-lc` 等の結合形を含む）で渡されたインラインコマンド文字列を返す。無ければ null。
 * ps の args は引用符が失われるため、`-c` 以降のトークンを連結して扱う。
 * @param {string[]} rest
 * @returns {string | null}
 */
function getInlineCommand(rest) {
  const index = rest.findIndex((token) => /^-[a-zA-Z]*c[a-zA-Z]*$/.test(token));
  return index === -1 ? null : rest.slice(index + 1).join(' ');
}

const whileTrue = processes.filter((p) => {
  // 実行ファイル名は先頭トークンの basename で判定（`/bin/bash` も許可）
  const { executable, rest } = parseCommand(p.args);
  if (!SHELL_EXECUTABLES.has(executable)) return false;
  // 引数の文字列（例: `bash foo.sh "while true"`）には反応させず、インラインコマンドのみ対象
  const inline = getInlineCommand(rest);
  return inline !== null && LOOP_AT_COMMAND_POSITION.test(inline) && !isSupervised(p);
});
for (const p of whileTrue) {
  // 孤立の断定はできないため候補（WARN）として報告し、単独では非ゼロ終了させない
  issues.push({
    severity: 'WARN',
    pid: p.pid,
    cputimeSeconds: p.cputimeSeconds,
    reason: `ストレステスト残骸の候補（親から切り離された while true ループ — CPU 時間: ${formatSeconds(p.cputimeSeconds)}）`,
    args: p.args.slice(0, 120) + (p.args.length > 120 ? '...' : ''),
  });
}

// ─────────────────────────────────────────────
// 結果出力
// ─────────────────────────────────────────────
console.log(`\n${BOLD}=== ゾンビプロセス診断 (check-zombie-tests) ===${RESET}\n`);

if (issues.length === 0) {
  console.log(`${GREEN}✔ 問題のあるプロセスは検出されませんでした。${RESET}\n`);
  process.exit(0);
}

let hasError = false;
for (const issue of issues) {
  const color = issue.severity === 'ERROR' ? RED : YELLOW;
  const icon = issue.severity === 'ERROR' ? '✖' : '⚠';
  console.log(`${color}${BOLD}[${issue.severity}]${RESET} ${color}${icon} PID ${issue.pid}${RESET}`);
  console.log(`  理由   : ${issue.reason}`);
  console.log(`  コマンド: ${issue.args.slice(0, 160)}${issue.args.length > 160 ? '...' : ''}`);
  if (issue.severity === 'ERROR') {
    console.log(`  対処   : kill ${issue.pid}（終了しない場合のみ kill -9 ${issue.pid}）`);
  } else {
    console.log(`  対処   : 用途を確認し、不要な場合のみ kill ${issue.pid} で停止`);
  }
  console.log('');
  if (issue.severity === 'ERROR') hasError = true;
}

console.log(`${BOLD}合計 ${issues.length} 件の問題が検出されました。${RESET}`);
console.log('[ERROR] の PID はまず `kill <pid>` で停止し、終了しない場合のみ `kill -9 <pid>` を使ってください。');
console.log('[WARN] の PID は用途を確認し、不要と判断した場合のみ停止してください。\n');

// ERROR がある場合は非ゼロ終了（CI での検出に対応）
process.exit(hasError ? 1 : 0);
