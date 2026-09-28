#!/usr/bin/env node
/**
 * scripts/check-zombie-tests.mjs
 *
 * ゾンビ（孤立・暴走）プロセスを検出し、警告する診断スクリプト。
 *
 * 検出対象:
 *   1. `bun test __tests__/` パターンのプロセス（Vitest 未経由の誤実行）
 *   2. CPU 時間が 60 分超の `bun` / `node` プロセス（長時間ハング候補）
 *   3. `while true` を含む zsh/bash プロセス（ストレステスト残骸候補）
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
 * @returns {{ pid: string, pcpu: string, cputimeSeconds: number, args: string }[]}
 */
function getAllProcesses() {
  try {
    const raw = execSync('ps -eo pid,pcpu,cputime,args', { encoding: 'utf8' });
    const lines = raw.trim().split('\n').slice(1); // ヘッダ除去
    return lines.map((line) => {
      const cols = line.trim().split(/\s+/);
      const pid = cols[0] ?? '';
      const pcpu = cols[1] ?? '0';
      const cputime = cols[2] ?? '00:00:00';
      const args = cols.slice(3).join(' ');
      return { pid, pcpu, cputimeSeconds: parseCputime(cputime), args };
    });
  } catch {
    console.error(`${RED}ERROR: ps コマンドが実行できませんでした。macOS 環境で実行してください。${RESET}`);
    process.exit(1);
  }
}

/**
 * cputime 文字列（HH:MM:SS または DDD:HH:MM:SS 形式）を秒数に変換する。
 * @param {string} cputime
 * @returns {number}
 */
function parseCputime(cputime) {
  const parts = cputime.split(':').map(Number);
  if (parts.length === 3) {
    // HH:MM:SS
    return (parts[0] ?? 0) * 3600 + (parts[1] ?? 0) * 60 + (parts[2] ?? 0);
  } else if (parts.length === 4) {
    // DDD:HH:MM:SS
    return (
      (parts[0] ?? 0) * 86400 +
      (parts[1] ?? 0) * 3600 +
      (parts[2] ?? 0) * 60 +
      (parts[3] ?? 0)
    );
  }
  return 0;
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

const processes = getAllProcesses();
const issues = [];

// ─────────────────────────────────────────────
// 検出 1: `bun test __tests__/` パターン
// ─────────────────────────────────────────────
const bunTestMisuse = processes.filter(
  (p) => /\bbun\b/.test(p.args) && /test\s+[^\s]*__tests__/.test(p.args) && !/run\s+test/.test(p.args),
);
for (const p of bunTestMisuse) {
  issues.push({
    severity: 'ERROR',
    pid: p.pid,
    cputimeSeconds: p.cputimeSeconds,
    reason: '`bun test __tests__/...` (Vitest 未経由の誤実行) — CPU ハングの危険',
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
// 検出 3: `while true` を含む zsh/bash プロセス
// ─────────────────────────────────────────────
const whileTrue = processes.filter(
  (p) => /while\s+true/.test(p.args) && /(zsh|bash)/.test(p.args),
);
for (const p of whileTrue) {
  issues.push({
    severity: 'ERROR',
    pid: p.pid,
    cputimeSeconds: p.cputimeSeconds,
    reason: `ストレステスト残骸の疑い（while true ループ — CPU 時間: ${formatSeconds(p.cputimeSeconds)}）`,
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
  console.log(`  対処   : kill -9 ${issue.pid}`);
  console.log('');
  if (issue.severity === 'ERROR') hasError = true;
}

console.log(`${BOLD}合計 ${issues.length} 件の問題が検出されました。${RESET}`);
console.log('上記の PID を `kill -9 <pid>` で終了させてください。\n');

// ERROR がある場合は非ゼロ終了（CI での検出に対応）
process.exit(hasError ? 1 : 0);
