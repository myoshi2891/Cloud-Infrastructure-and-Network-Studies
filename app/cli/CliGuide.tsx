'use client';

import React, { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

export default function CliGuide() {
    return (
        <div className="cli-page">
            <div className="layout">
                <NavBar />

                <main className="content">
                    <div className="inner">
                        <header className="hero">
                            <h1>
                                CLIコマンド実践ワンライナー集<br />初学者のためのステップバイステップガイド
                            </h1>
                            <p className="lede">
                                日常の開発・運用・トラブルシューティングで「知っていると10倍速くなる」CLIワンライナーを、仕組みの理解から実践シナリオまで段階的に解説します。
                            </p>
                            <div className="meta-row">
                                <span className="pill">対象：ターミナル操作の基礎を理解した初学者</span>
                                <span className="pill">
                                    環境：bash / zsh（Linuxメイン、macOS/WSL2対応 ※macOSではss/freeの代わりにlsof/top等、sed -iはsed -i &apos;&apos;を使用）
                                </span>
                                <span className="pill">全15セクション・Mermaid図解7点</span>
                            </div>
                        </header>

                        {/* ============ 1. 基礎知識 ============ */}
                        <section id="sec-basics" tabIndex={-1}>
                            <h2><span className="num">1.</span> 基礎知識：ワンライナーを支える仕組み</h2>
                            <p>
                                ワンライナーは魔法ではなく、「小さな仕事をする複数のコマンド」を<strong>パイプ</strong>でつなぎ合わせたものです。仕組みを理解すれば、暗記に頼らず自分でワンライナーを組み立てられるようになります。
                            </p>

                            <h3>1.1 標準入出力とパイプ・リダイレクト</h3>
                            <p>すべてのコマンドは次の3つのデータの通り道（ストリーム）を持ちます。</p>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">ストリーム</th>
                                            <th scope="col">略称</th>
                                            <th scope="col">番号</th>
                                            <th scope="col">役割</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>標準入力</td>
                                            <td>stdin</td>
                                            <td>0</td>
                                            <td>コマンドへの入力</td>
                                        </tr>
                                        <tr>
                                            <td>標準出力</td>
                                            <td>stdout</td>
                                            <td>1</td>
                                            <td>正常な結果の出力先</td>
                                        </tr>
                                        <tr>
                                            <td>標準エラー出力</td>
                                            <td>stderr</td>
                                            <td>2</td>
                                            <td>エラーメッセージの出力先</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p>これらを操作する記号は以下の通りです。</p>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">記号</th>
                                            <th scope="col">意味</th>
                                            <th scope="col">例</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>|</code></td>
                                            <td>
                                                左のコマンドの標準出力を右のコマンドの標準入力へ渡す（パイプ）
                                            </td>
                                            <td><code>ps aux | grep nginx</code></td>
                                        </tr>
                                        <tr>
                                            <td><code>&gt;</code></td>
                                            <td>標準出力をファイルへ上書き</td>
                                            <td><code>echo hello &gt; out.txt</code></td>
                                        </tr>
                                        <tr>
                                            <td><code>&gt;&gt;</code></td>
                                            <td>標準出力をファイルへ追記</td>
                                            <td><code>echo hello &gt;&gt; out.txt</code></td>
                                        </tr>
                                        <tr>
                                            <td><code>2&gt;</code></td>
                                            <td>標準エラーのみリダイレクト</td>
                                            <td><code>command 2&gt; error.log</code></td>
                                        </tr>
                                        <tr>
                                            <td><code>2&gt;&amp;1</code></td>
                                            <td>標準出力と標準エラーの両方をまとめる</td>
                                            <td><code>command &gt; all.log 2&gt;&amp;1</code></td>
                                        </tr>
                                        <tr>
                                            <td><code>&lt;</code></td>
                                            <td>ファイルの内容を標準入力として渡す</td>
                                            <td><code>sort &lt; data.txt</code></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <Diagram id="diag-streams" label="標準入出力ストリームとパイプラインの概念図" />

                            <h3>1.2 コマンド置換とxargsの連携</h3>
                            <p>
                                <code>$(コマンド)</code> は「コマンドの実行結果を文字列として埋め込む」構文です。一方 <code>xargs</code> は「パイプで受け取った一覧を、後続コマンドの<strong>引数</strong>として渡す」ためのブリッジ役です。この違いを理解すると、<code>find</code> や <code>grep</code> の結果を他のコマンドに渡す際に迷わなくなります。
                            </p>

                            <div className="code-block" role="region" aria-label="コマンド置換とxargsの例">
                                <div className="code-line"><span className="code-comment"># コマンド置換：結果を1つの文字列として埋め込む</span></div>
                                <div className="code-line">kill $(pgrep -f my_app)</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="code-comment"># xargs：一覧（複数行）を引数化して繰り返し実行</span></div>
                                <div className="code-line">find . -name &quot;*.log&quot; -print0 | xargs -0 rm</div>
                            </div>

                            <h3>1.3 安全に試すための心得</h3>
                            <ul>
                                <li>
                                    破壊的な操作（削除・上書き）の前に、まず<strong>確認だけのコマンド</strong>（
                                    <code>-print</code>
                                    や <code>echo</code>）で対象を確認する
                                </li>
                                <li>
                                    初めて使うワンライナーは、影響範囲の小さいディレクトリで試してから本番に適用する
                                </li>
                                <li>
                                    <code>xargs</code> には
                                    <code>-p</code>
                                    （実行前に確認プロンプトを出す）オプションがあり、学習中はこれを使うと安心
                                </li>
                                <li>
                                    迷ったら <code>man コマンド名</code> または
                                    <code>コマンド名 --help</code> で公式の説明を確認する
                                </li>
                            </ul>
                        </section>

                        {/* ============ 2. find / xargs ============ */}
                        <section id="sec-find" tabIndex={-1}>
                            <h2><span className="num">2.</span> ファイル探索：find / xargs</h2>
                            <p>
                                <code>find</code> はディレクトリツリーを条件付きで探索するコマンド、<code>xargs</code> はその結果を後続コマンドに渡すコマンドです（出典：GNU Findutils マニュアル）。
                            </p>

                            <h3>2.1 基本構文</h3>
                            <div className="code-block" role="region" aria-label="findの基本構文">
                                <div className="code-line">find [検索開始パス] [条件] [アクション]</div>
                            </div>

                            <h3>2.2 実践ワンライナー表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">目的</th>
                                            <th scope="col">ワンライナー</th>
                                            <th scope="col">解説</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>直近60分以内に更新されたファイルを探す</td>
                                            <td><code>find . -mmin -60 -type f</code></td>
                                            <td>
                                                <code>-mmin -60</code> は「60分以内に更新」を意味する
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>7日以上前の <code>.log</code> ファイルを確認する</td>
                                            <td><code>find /var/log -name &quot;*.log&quot; -mtime +6</code></td>
                                            <td>
                                                <code>-mtime +6</code>
                                                は「更新から7日以上経過」。まずは確認のみで削除しない
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>空のディレクトリを一括削除する</td>
                                            <td><code>find . -type d -empty -delete</code></td>
                                            <td>
                                                <code>-delete</code> は該当した空ディレクトリのみ削除
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>拡張子ごとのファイル数を集計する</td>
                                            <td>
                                                <code>
                                                    find . -type f -exec basename &#123;&#125; \; | sed -n &apos;s/.*\.\([^.]*\)$/\1/p&apos; | sort | uniq -c |
                                                    sort -rn
                                                </code>
                                            </td>
                                            <td>
                                                <code>find</code> の結果を <code>basename</code> で変換後、拡張子のみ抽出して集計するパイプライン
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>特定文字列を含むファイル一覧を安全に取得する</td>
                                            <td>
                                                <code>
                                                    find . -name &quot;*.js&quot; -print0 | xargs -0 grep -l
                                                    &quot;TODO&quot;
                                                </code>
                                            </td>
                                            <td>
                                                <code>-print0</code> と
                                                <code>xargs -0</code>
                                                の組み合わせでファイル名の空白・改行に対応
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>パーミッションが777のファイルを検出する</td>
                                            <td><code>find . -type f -perm 0777</code></td>
                                            <td>権限が緩すぎるファイルの棚卸しに使う</td>
                                        </tr>
                                        <tr>
                                            <td>一時ファイルを確認しながら削除する</td>
                                            <td>
                                                <code>
                                                    find . -name &quot;*.tmp&quot; -print0 | xargs -0 -n 1 -p rm
                                                </code>
                                            </td>
                                            <td>
                                                <code>-p</code> で1件ずつ実行確認が出るため学習中も安全
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>2.3 意思決定フロー</h3>
                            <Diagram id="diag-find" label="findおよびxargsの意思決定フローチャート" />

                            <h3>2.4 注意点</h3>
                            <ul>
                                <li>
                                    ファイル名にスペース、改行、引用符、バックスラッシュが含まれる可能性がある環境では、通常の
                                    <code>xargs</code> で誤解釈されるリスクがあるため、必ず
                                    <code>-print0</code> / <code>xargs -0</code> または <code>-exec ... &#123;&#125; +</code> を使う
                                </li>
                                <li>
                                    <code>-delete</code> や <code>-exec rm</code> を使う前に、同じ条件で
                                    <code>-print</code> して対象件数と内容を必ず目視確認する
                                </li>
                            </ul>
                        </section>

                        {/* ============ 3. grep ============ */}
                        <section id="sec-grep" tabIndex={-1}>
                            <h2><span className="num">3.</span> テキスト検索：grep</h2>
                            <p>
                                <code>grep</code> はパターンマッチによりテキストの中から一致する行を検索するコマンドです（出典：GNU Grep マニュアル）。
                            </p>

                            <h3>3.1 基本構文</h3>
                            <div className="code-block" role="region" aria-label="grepの基本構文">
                                <div className="code-line">grep [オプション] &quot;検索パターン&quot; [対象ファイル]</div>
                            </div>

                            <h3>3.2 実践ワンライナー表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">目的</th>
                                            <th scope="col">ワンライナー</th>
                                            <th scope="col">解説</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ディレクトリ配下を再帰的に検索し行番号も表示</td>
                                            <td><code>grep -rn &quot;ERROR&quot; ./logs</code></td>
                                            <td>
                                                <code>-r</code> 再帰検索、<code>-n</code> 行番号表示
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>大文字・小文字を区別せず検索</td>
                                            <td><code>grep -i &quot;warning&quot; app.log</code></td>
                                            <td><code>-i</code> で大文字小文字を無視</td>
                                        </tr>
                                        <tr>
                                            <td>特定行を除外して残りを表示（ノイズ除去）</td>
                                            <td><code>grep -v &quot;^#&quot; config.conf</code></td>
                                            <td>
                                                <code>-v</code>
                                                は一致しない行を出力（コメント行の除外に便利）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>複数パターンをOR条件で検索</td>
                                            <td><code>grep -E &quot;ERROR|FATAL&quot; app.log</code></td>
                                            <td>
                                                <code>-E</code> は拡張正規表現を有効化し
                                                <code>|</code> でOR条件を表現
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>一致した件数だけを知りたい</td>
                                            <td><code>grep -c &quot;ERROR&quot; app.log</code></td>
                                            <td>出力ではなく件数のみをカウントして返す</td>
                                        </tr>
                                        <tr>
                                            <td>特定拡張子のファイルに絞って検索</td>
                                            <td>
                                                <code>grep -rn --include=&quot;*.py&quot; &quot;import os&quot; .</code>
                                            </td>
                                            <td><code>--include</code> でファイルパターンを絞り込む</td>
                                        </tr>
                                        <tr>
                                            <td>バイナリファイルを除外して検索</td>
                                            <td><code>grep -rI &quot;password&quot; .</code></td>
                                            <td>
                                                <code>-I</code> はバイナリファイルを検索対象から自動除外
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>3.3 注意点</h3>
                            <ul>
                                <li>
                                    正規表現の特殊文字（<code>.</code> <code>*</code> <code>[</code>
                                    <code>]</code> など）を含む文字列を検索する場合は
                                    <code>grep -F</code> で「固定文字列検索」にすると誤動作を防げる
                                </li>
                                <li>
                                    大量ログを検索する際は
                                    <code>grep</code> を1回で完結させ、無駄なパイプを増やさない方が高速
                                </li>
                            </ul>
                        </section>

                        {/* ============ 4. sed ============ */}
                        <section id="sec-sed" tabIndex={-1}>
                            <h2><span className="num">4.</span> テキスト変換：sed</h2>
                            <p>
                                <code>sed</code>（stream editor）はテキストをストリームとして1行ずつ処理し、置換・削除・抽出を行うコマンドです（出典：GNU sed マニュアル）。
                            </p>

                            <h3>4.1 基本構文</h3>
                            <div className="code-block" role="region" aria-label="sedの基本構文">
                                <div className="code-line">sed &apos;s/検索文字列/置換文字列/フラグ&apos; ファイル</div>
                            </div>

                            <h3>4.2 実践ワンライナー表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">目的</th>
                                            <th scope="col">ワンライナー</th>
                                            <th scope="col">解説</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>各行の最初の一致だけ置換する</td>
                                            <td><code>sed &apos;s/foo/bar/&apos; file.txt</code></td>
                                            <td>フラグなしは各行1回目の一致のみ置換</td>
                                        </tr>
                                        <tr>
                                            <td>行内のすべての一致を置換する</td>
                                            <td><code>sed &apos;s/foo/bar/g&apos; file.txt</code></td>
                                            <td><code>g</code> フラグで行内の全一致を置換</td>
                                        </tr>
                                        <tr>
                                            <td>ファイルを直接書き換える（バックアップ付き）</td>
                                            <td><code>sed -i.bak &apos;s/foo/bar/g&apos; file.txt</code></td>
                                            <td>
                                                <code>-i.bak</code> で
                                                <code>file.txt.bak</code> を残しつつ元ファイルを書き換え
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>空行だけを削除する</td>
                                            <td><code>sed &apos;/^$/d&apos; file.txt</code></td>
                                            <td><code>d</code> コマンドで一致した行を削除</td>
                                        </tr>
                                        <tr>
                                            <td>特定範囲の行だけを抽出する</td>
                                            <td><code>sed -n &apos;10,20p&apos; file.txt</code></td>
                                            <td>
                                                <code>-n</code> で自動出力を抑止し、<code>p</code>
                                                で指定範囲のみ出力
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>複数ファイルをまとめて一括置換する</td>
                                            <td>
                                                <code>
                                                    find . -name &quot;*.txt&quot; -print0 | xargs -0 sed -i
                                                    &apos;s/old/new/g&apos;
                                                </code>
                                            </td>
                                            <td>
                                                <code>find</code> と組み合わせて多数のファイルに一括適用
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>4.3 注意点</h3>
                            <ul>
                                <li>
                                    macOS標準の <code>sed</code>（BSD版）と Linux の GNU sed
                                    はオプションの挙動が異なる（特に
                                    <code>-i</code>
                                    の後にバックアップ拡張子が必須か否か）。移植性が必要なスクリプトでは注意する
                                </li>
                                <li>
                                    <code>-i</code> で直接上書きする前に、バックアップオプション（
                                    <code>-i.bak</code>
                                    など）を使うか、対象ファイルをコピーしてから試す
                                </li>
                            </ul>
                        </section>

                        {/* ============ 5. awk / sort / uniq / cut / wc ============ */}
                        <section id="sec-awk" tabIndex={-1}>
                            <h2>
                                <span className="num">5.</span> テキスト集計：awk / sort / uniq / cut / wc
                            </h2>
                            <p>
                                <code>awk</code> はフィールド（列）ベースでテキストを処理するプログラミング言語であり、集計・レポート作成に強みがあります（出典：GNU Awk User&apos;s Guide）。sort・uniq・cut・wc は GNU Coreutils に含まれる定番の集計系コマンドです（出典：GNU Coreutils マニュアル）。
                            </p>

                            <h3>5.1 基本構文</h3>
                            <div className="code-block" role="region" aria-label="awkの基本構文">
                                <div className="code-line">awk -F&apos;区切り文字&apos; &apos;条件 &#123;処理&#125;&apos; ファイル</div>
                            </div>

                            <h3>5.2 実践ワンライナー表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">目的</th>
                                            <th scope="col">ワンライナー</th>
                                            <th scope="col">解説</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CSVの特定列だけを抽出する</td>
                                            <td><code>awk -F&apos;,&apos; &apos;&#123;print $2&#125;&apos; data.csv</code></td>
                                            <td>
                                                <code>-F&apos;,&apos;</code> でカンマ区切りを指定し、2列目を出力
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>条件に合う行だけ抽出する</td>
                                            <td><code>awk -F&apos;,&apos; &apos;$3&gt;100 &#123;print&#125;&apos; data.csv</code></td>
                                            <td>3列目の値が100より大きい行だけ出力</td>
                                        </tr>
                                        <tr>
                                            <td>ある列の合計を計算する</td>
                                            <td>
                                                <code>
                                                    awk -F&apos;,&apos; &apos;&#123;sum+=$3&#125; END &#123;print sum&#125;&apos;
                                                    data.csv
                                                </code>
                                            </td>
                                            <td><code>END</code> ブロックで全行処理後の合計を出力</td>
                                        </tr>
                                        <tr>
                                            <td>重複行を除去して出現回数を集計する</td>
                                            <td><code>sort file.txt | uniq -c | sort -rn</code></td>
                                            <td>
                                                <code>sort</code>→<code>uniq -c</code>→
                                                <code>sort -rn</code>
                                                の定番3段パイプライン
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>行数・単語数・バイト数を数える</td>
                                            <td><code>wc -l file.txt</code></td>
                                            <td>
                                                <code>-l</code> は行数のみカウント（単語数は
                                                <code>-w</code>、バイト数は <code>-c</code>）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>タブ区切りファイルの特定列を抜き出す</td>
                                            <td><code>cut -f2 data.tsv</code></td>
                                            <td>
                                                <code>-f2</code>
                                                で2列目のみ抽出（区切り文字省略時はタブ）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>アクセスログのIP別アクセス数トップ10</td>
                                            <td>
                                                <code>
                                                    awk &apos;&#123;print $1&#125;&apos; access.log | sort | uniq -c | sort
                                                    -rn | head -10
                                                </code>
                                            </td>
                                            <td>ログ集計の代表的な組み合わせ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>5.3 ログ集計パイプラインの流れ</h3>
                            <Diagram id="diag-log-pipeline" label="アクセスログ集計パイプラインのフロー図" />

                            <h3>5.4 注意点</h3>
                            <ul>
                                <li>
                                    <code>sort | uniq -c</code> の順序は重要。<code>uniq</code>
                                    は<strong>隣接する行</strong>しか重複と見なさないため、必ず先に
                                    <code>sort</code> する
                                </li>
                                <li>
                                    <code>awk</code> のフィールド番号は1始まり（<code>$1</code>
                                    が1列目）。<code>$0</code> は行全体を表す
                                </li>
                            </ul>
                        </section>

                        {/* ============ 6. ps / top / kill / lsof ============ */}
                        <section id="sec-ps" tabIndex={-1}>
                            <h2><span className="num">6.</span> プロセス管理：ps / top / kill / lsof</h2>
                            <p>
                                サーバーの動作が重い、特定プロセスが応答しないといった状況でまず頼るのがこの章のコマンド群です。
                            </p>

                            <h3>6.1 実践ワンライナー表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">目的</th>
                                            <th scope="col">ワンライナー</th>
                                            <th scope="col">解説</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>CPU使用率トップ10のプロセスを表示</td>
                                            <td><code>ps aux --sort=-%cpu | head -n 11</code></td>
                                            <td>ヘッダー行込みで11行取得（実質トップ10）</td>
                                        </tr>
                                        <tr>
                                            <td>メモリ使用率トップ10のプロセスを表示</td>
                                            <td><code>ps aux --sort=-%mem | head -n 11</code></td>
                                            <td>メモリ逼迫時の原因調査に使う</td>
                                        </tr>
                                        <tr>
                                            <td>プロセス名からPIDを特定する</td>
                                            <td><code>pgrep -fl node</code></td>
                                            <td>
                                                <code>-f</code> はコマンドライン全体を対象、
                                                <code>-l</code>
                                                でプロセス名も表示
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>プロセスを正常終了させる</td>
                                            <td><code>kill -TERM $(pgrep -f my_app)</code></td>
                                            <td>
                                                まずは正常終了シグナル（<code>SIGTERM</code>）を送るのが基本
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>応答しないプロセスを強制終了する</td>
                                            <td><code>kill -KILL $(pgrep -f my_app)</code></td>
                                            <td>
                                                <code>SIGTERM</code> で終了しない場合の最終手段（
                                                <code>kill -9</code>
                                                と同義）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>特定ポートを使用中のプロセスを特定する</td>
                                            <td><code>lsof -i :8080</code></td>
                                            <td>「Address already in use」エラーの原因調査に必須</td>
                                        </tr>
                                        <tr>
                                            <td>特定ファイルを開いているプロセスを特定する</td>
                                            <td><code>lsof /var/log/syslog</code></td>
                                            <td>
                                                ファイルが削除できない・ロックされている際の調査に使う
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>ゾンビプロセスを検出する</td>
                                            <td><code>ps aux | awk &apos;$8==&quot;Z&quot;&apos;</code></td>
                                            <td>ステータス列が <code>Z</code> のプロセスを抽出</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>6.2 トラブルシューティングの意思決定フロー</h3>
                            <Diagram id="diag-process" label="プロセストラブルシューティングの意思決定フローチャート" />

                            <h3>6.3 注意点</h3>
                            <ul>
                                <li>
                                    <code>kill -KILL</code>（<code>kill -9</code>
                                    ）はプロセスに終了処理（後片付け）をさせずに強制終了するため、データ破損のリスクがある。まず
                                    <code>-TERM</code> を試す
                                </li>
                                <li>
                                    本番環境で他人のプロセスを
                                    <code>kill</code> する前に、そのプロセスが何であるか（
                                    <code>ps -p PID -o cmd=</code>
                                    などで）必ず確認する
                                </li>
                            </ul>
                        </section>

                        {/* ============ 7. curl / ss / dig / ping ============ */}
                        <section id="sec-net" tabIndex={-1}>
                            <h2>
                                <span className="num">7.</span> ネットワーク診断：curl / ss / dig / ping
                            </h2>
                            <p>
                                「サービスに繋がらない」というトラブルは、疎通→名前解決→アプリ応答→ローカルのポート状態、の順に切り分けると原因を絞り込みやすくなります。
                            </p>

                            <h3>7.1 実践ワンライナー表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">目的</th>
                                            <th scope="col">ワンライナー</th>
                                            <th scope="col">解説</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>HTTPステータスコードだけ確認する</td>
                                            <td>
                                                <code>
                                                    curl -o /dev/null -s -w &quot;%&#123;http_code&#125;\n&quot;
                                                    https://example.com
                                                </code>
                                            </td>
                                            <td>
                                                ボディを捨て、ステータスコードのみ出力（出典：curl man
                                                page）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>レスポンスヘッダのみ取得する</td>
                                            <td><code>curl -I https://example.com</code></td>
                                            <td>HEADリクエストでヘッダのみ取得</td>
                                        </tr>
                                        <tr>
                                            <td>応答時間を計測する</td>
                                            <td>
                                                <code>
                                                    curl -o /dev/null -s -w &quot;%&#123;time_total&#125;\n&quot;
                                                    https://example.com
                                                </code>
                                            </td>
                                            <td>サーバーの応答遅延の切り分けに使う</td>
                                        </tr>
                                        <tr>
                                            <td>待ち受け中のTCPポート一覧を表示する</td>
                                            <td><code>ss -tlnp</code></td>
                                            <td>
                                                <code>-t</code> TCP, <code>-l</code> 待受のみ,
                                                <code>-n</code> 名前解決なし,
                                                <code>-p</code> プロセス情報付き（出典：ss man page）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>確立済みのTCP接続一覧を表示する</td>
                                            <td><code>ss -tan state established</code></td>
                                            <td>現在アクティブな通信を確認</td>
                                        </tr>
                                        <tr>
                                            <td>DNSのAレコードを確認する</td>
                                            <td><code>dig example.com +short</code></td>
                                            <td>名前解決の結果だけを簡潔に表示</td>
                                        </tr>
                                        <tr>
                                            <td>疎通確認を4回だけ行う</td>
                                            <td><code>ping -c 4 example.com</code></td>
                                            <td>
                                                <code>-c</code>
                                                で回数を指定し、無限に実行され続けるのを防ぐ
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>7.2 ネットワーク疎通確認の切り分けフロー</h3>
                            <Diagram id="diag-network" label="ネットワーク疎通確認の切り分けフローチャート" />

                            <h3>7.3 注意点</h3>
                            <ul>
                                <li>
                                    <code>ping</code>
                                    がブロックされているネットワーク（ICMP無効化）もあるため、応答が無い＝必ずしもサービス停止とは限らない
                                </li>
                                <li>
                                    本番環境の <code>curl</code> 調査では
                                    <code>-sS</code>（エラー表示付きサイレント）と
                                    <code>-o /dev/null</code>
                                    （ボディ破棄）を組み合わせ、ログを汚さないようにする
                                </li>
                            </ul>
                        </section>

                        {/* ============ 8. df / du / free ============ */}
                        <section id="sec-disk" tabIndex={-1}>
                            <h2><span className="num">8.</span> ディスク・システム情報：df / du / free</h2>
                            <p>
                                「ディスクが逼迫している」「メモリが足りない」といった調査の起点になるコマンド群です。
                            </p>

                            <h3>8.1 実践ワンライナー表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">目的</th>
                                            <th scope="col">ワンライナー</th>
                                            <th scope="col">解説</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>パーティションごとの使用率を確認する</td>
                                            <td><code>df -h</code></td>
                                            <td>
                                                <code>-h</code>
                                                で人間が読みやすい単位（GB/MBなど）表示（出典：GNU
                                                Coreutils マニュアル）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>inode使用率を確認する</td>
                                            <td><code>df -i</code></td>
                                            <td>「容量はあるのにファイルが作れない」場合の原因調査</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                カレントディレクトリ内で容量の大きいディレクトリTOP10
                                            </td>
                                            <td><code>du -sh */ | sort -rh | head -10</code></td>
                                            <td>
                                                <code>du -sh</code>
                                                で各ディレクトリの合計サイズを表示し降順ソート
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>100MBを超えるファイルを検出する</td>
                                            <td>
                                                <code>
                                                    find . -type f -size +100M -exec ls -lh &#123;&#125; \;
                                                </code>
                                            </td>
                                            <td>容量を圧迫している個別ファイルの特定に使う</td>
                                        </tr>
                                        <tr>
                                            <td>メモリの空き容量を確認する</td>
                                            <td><code>free -h</code></td>
                                            <td><code>-h</code> で人間が読みやすい単位表示</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>8.2 注意点</h3>
                            <ul>
                                <li>
                                    <code>du</code>
                                    は集計に時間がかかることがあるため、対象を絞り込んでから実行する（例：
                                    <code>du -sh /var/log/*</code>
                                    ）
                                </li>
                                <li>
                                    ディスク逼迫は「容量」だけでなく「inode枯渇」でも発生するため、
                                    <code>df -h</code>
                                    で容量に余裕があっても <code>df -i</code> を確認する習慣をつける
                                </li>
                            </ul>
                        </section>

                        {/* ============ 9. git ============ */}
                        <section id="sec-git" tabIndex={-1}>
                            <h2><span className="num">9.</span> Git実践ワンライナー</h2>
                            <p>
                                Gitはバージョン管理システムの事実上の標準です（出典：Git公式ドキュメント
                                / git-scm.com）。
                            </p>

                            <h3>9.1 実践ワンライナー表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">目的</th>
                                            <th scope="col">ワンライナー</th>
                                            <th scope="col">解説</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>コミット履歴を1行・グラフ付きで見やすく表示</td>
                                            <td>
                                                <code>git log --oneline --graph --decorate --all</code>
                                            </td>
                                            <td>ブランチの分岐・マージが視覚的に把握できる</td>
                                        </tr>
                                        <tr>
                                            <td>変更されたファイル名だけを表示する</td>
                                            <td><code>git diff --name-only</code></td>
                                            <td>レビュー前の変更範囲確認に便利</td>
                                        </tr>
                                        <tr>
                                            <td>マージ済みのローカルブランチを一括削除する</td>
                                            <td>
                                                <code>
                                                    git branch --merged | grep -v &quot;\*\|main\|master&quot; |
                                                    xargs -n 1 git branch -d
                                                </code>
                                            </td>
                                            <td>
                                                <code>main</code>
                                                /<code>master</code>・現在ブランチを除外して安全に削除
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>特定ファイルの変更履歴を追う</td>
                                            <td><code>git log -p -- path/to/file</code></td>
                                            <td>ファイル単位で過去の差分をすべて追跡できる</td>
                                        </tr>
                                        <tr>
                                            <td>直前のコミットメッセージだけを修正する</td>
                                            <td><code>git commit --amend --only -m &quot;new message&quot;</code></td>
                                            <td>まだ push していないコミットの言い直しに使う</td>
                                        </tr>
                                        <tr>
                                            <td>期間内のコミット数を著者別に集計する</td>
                                            <td>
                                                <code>
                                                    git log --since=&quot;1 week ago&quot; --pretty=format:&quot;%an&quot;
                                                    | sort | uniq -c | sort -rn
                                                </code>
                                            </td>
                                            <td>チームの活動量の可視化に使える</td>
                                        </tr>
                                        <tr>
                                            <td>ステージ済みの差分だけを確認する</td>
                                            <td><code>git diff --cached</code></td>
                                            <td>
                                                <code>git add</code>
                                                した内容がコミット前に意図通りか確認
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>9.2 注意点</h3>
                            <ul>
                                <li>
                                    <code>git branch -D</code>
                                    （大文字）は未マージの変更も強制削除するため、通常は
                                    <code>-d</code>（小文字、マージ済みのみ削除可）を使う
                                </li>
                                <li>
                                    共有リポジトリで <code>git commit --amend</code> や
                                    <code>git rebase</code> を行った後の <code>push</code> には
                                    <code>--force-with-lease</code>
                                    を検討し、他者の変更を上書きしないよう注意する
                                </li>
                            </ul>
                        </section>

                        {/* ============ 10. docker ============ */}
                        <section id="sec-docker" tabIndex={-1}>
                            <h2><span className="num">10.</span> Docker実践ワンライナー</h2>
                            <p>
                                コンテナ環境の運用でも「一括整理」「状況確認」のワンライナーは頻出です（出典：Docker公式ドキュメント）。
                            </p>

                            <h3>10.1 実践ワンライナー表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">目的</th>
                                            <th scope="col">ワンライナー</th>
                                            <th scope="col">解説</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>停止中のコンテナを一括削除する</td>
                                            <td><code>docker container prune -f</code></td>
                                            <td>
                                                <code>-f</code>
                                                で確認プロンプトを省略（内容を理解した上で使う）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>未使用のイメージを一括削除する</td>
                                            <td><code>docker image prune -a -f</code></td>
                                            <td>
                                                <code>-a</code> はタグ付きでも未使用なら削除対象にする
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>実行中コンテナのログをリアルタイム表示する</td>
                                            <td><code>docker logs -f コンテナ名</code></td>
                                            <td><code>-f</code> でログを追従表示</td>
                                        </tr>
                                        <tr>
                                            <td>稼働中コンテナの中にシェルで入る</td>
                                            <td><code>docker exec -it コンテナ名 /bin/bash</code></td>
                                            <td><code>-it</code> で対話的なシェルセッションを開始</td>
                                        </tr>
                                        <tr>
                                            <td>全コンテナのリソース使用状況をリアルタイム表示する</td>
                                            <td><code>docker stats</code></td>
                                            <td>CPU・メモリ・ネットワークI/Oを一覧でモニタリング</td>
                                        </tr>
                                        <tr>
                                            <td>イメージをサイズ順に一覧表示する</td>
                                            <td>
                                                <code>
                                                    docker images --format
                                                    &quot;&#123;&#123;.Repository&#125;&#125;:&#123;&#123;.Tag&#125;&#125;\t&#123;&#123;.Size&#125;&#125;&quot; | sort -k2
                                                    -h
                                                </code>
                                            </td>
                                            <td>ディスクを圧迫している大きいイメージの特定に使う</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>10.2 注意点</h3>
                            <ul>
                                <li>
                                    <code>prune</code>
                                    系コマンドは対象を完全に削除するため、必要なデータ（ボリューム含む）が残っているか事前に
                                    <code>docker ps -a</code> や
                                    <code>docker volume ls</code> で確認する
                                </li>
                                <li>
                                    <code>-f</code>
                                    （force）オプションは確認プロンプトを飛ばすため、内容を理解してから使う
                                </li>
                            </ul>
                        </section>

                        {/* ============ 11. journalctl / tail ============ */}
                        <section id="sec-log" tabIndex={-1}>
                            <h2><span className="num">11.</span> ログ調査：journalctl / tail</h2>
                            <p>
                                systemd環境のログ管理は <code>journalctl</code> が標準です（出典：journalctl man page）。
                            </p>

                            <h3>11.1 実践ワンライナー表</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">目的</th>
                                            <th scope="col">ワンライナー</th>
                                            <th scope="col">解説</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>システムログをリアルタイム表示する</td>
                                            <td><code>journalctl -f</code></td>
                                            <td><code>tail -f</code> のsystemd版</td>
                                        </tr>
                                        <tr>
                                            <td>特定サービスのログを直近1時間分だけ表示する</td>
                                            <td>
                                                <code>
                                                    journalctl -u nginx.service --since &quot;1 hour
                                                    ago&quot;
                                                </code>
                                            </td>
                                            <td><code>-u</code> でユニット（サービス）名を指定</td>
                                        </tr>
                                        <tr>
                                            <td>エラー以上の優先度のログだけを表示する</td>
                                            <td><code>journalctl -p err -b</code></td>
                                            <td>
                                                <code>-p err</code> で優先度フィルタ、<code>-b</code>
                                                は今回起動分のみ
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>ログファイルの末尾をリアルタイム監視する</td>
                                            <td><code>tail -f /var/log/syslog</code></td>
                                            <td>古典的だが今でも現役の定番コマンド</td>
                                        </tr>
                                        <tr>
                                            <td>複数ログファイルを同時に監視する</td>
                                            <td><code>tail -f app1.log app2.log</code></td>
                                            <td>複数プロセスのログを並行して追う場合に便利</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>11.2 注意点</h3>
                            <ul>
                                <li>
                                    <code>journalctl</code>
                                    はデフォルトで大量のログを保持するため、対象期間・優先度・ユニットで必ず絞り込んでから読む
                                </li>
                                <li>
                                    ログにアクセスできない場合は、権限（<code>sudo</code>
                                    が必要か、<code>systemd-journal</code>
                                    グループに所属しているか）を確認する
                                </li>
                            </ul>
                        </section>

                        {/* ============ 12. 実践シナリオ ============ */}
                        <section id="sec-scenario" tabIndex={-1}>
                            <h2><span className="num">12.</span> 組み合わせ実践シナリオ</h2>
                            <p>
                                ここまでのコマンドを実際のトラブルシューティングの流れとして組み合わせます。
                            </p>

                            <div className="card note">
                                <h4>シナリオA：ディスク容量が逼迫している</h4>
                                <Diagram id="diag-scenario-a" label="ディスク容量逼迫トラブルシューティング手順" />
                            </div>

                            <div className="card note">
                                <h4>シナリオB：ポート競合でサーバーが起動できない</h4>
                                <Diagram id="diag-scenario-b" label="ポート競合トラブルシューティング手順" />
                            </div>

                            <div className="card note">
                                <h4>シナリオC：アクセスログから異常を検知する</h4>
                                <p>直近のログから404エラーが多いパスをトップ10で確認する：</p>
                                <div className="code-block" role="region" aria-label="アクセスログ異常検知ワンライナー">
                                    <div className="code-line">grep &quot; 404 &quot; access.log | awk &apos;&#123;print $7&#125;&apos; | sort | uniq -c | sort -rn | head -10</div>
                                </div>
                                <p>
                                    この1行は「grep（絞り込み）→ awk（列抽出）→ sort（整列）→ uniq
                                    -c（集計）→ sort -rn（降順）→
                                    head（上位表示）」という、これまでに学んだパイプラインの組み合わせそのものです。仕組みを理解していれば、初見のワンライナーでも読み解けるようになります。
                                </p>
                            </div>
                        </section>

                        {/* ============ 13. ベストプラクティス ============ */}
                        <section id="sec-safety" tabIndex={-1}>
                            <h2><span className="num">13.</span> 安全に使うためのベストプラクティス</h2>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">危険なパターン</th>
                                            <th scope="col">リスク</th>
                                            <th scope="col">安全な代替・対策</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>rm -rf *</code></td>
                                            <td>想定外のディレクトリで実行すると全削除</td>
                                            <td>
                                                先に <code>find ... -print</code> や
                                                <code>ls</code> で対象を目視確認してから実行する
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><code>dd if=... of=/dev/sdX</code></td>
                                            <td>対象デバイスを誤るとデータ完全消失</td>
                                            <td>
                                                <code>lsblk</code> や
                                                <code>fdisk -l</code> で対象デバイスを必ず二重確認する
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <code>curl URL | sh</code>（未検証スクリプトの直接実行）
                                            </td>
                                            <td>任意コードが無検証で実行される</td>
                                            <td>一度ファイルに保存し、中身を確認してから実行する</td>
                                        </tr>
                                        <tr>
                                            <td><code>kill -9</code> を常用する</td>
                                            <td>プロセスの後始末が行われずデータ破損のリスク</td>
                                            <td>
                                                まず <code>kill -TERM</code> を試し、反応がなければ
                                                <code>-9</code> を使う
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><code>chmod -R 777</code></td>
                                            <td>権限が過剰になりセキュリティリスクが増す</td>
                                            <td>
                                                必要最小限の権限（<code>755</code>/<code>644</code>
                                                など）を個別に付与する
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><code>xargs</code> に確認なしで削除系コマンドを渡す</td>
                                            <td>想定外の件数を一括削除してしまう</td>
                                            <td>
                                                学習中・初回実行時は
                                                <code>xargs -p</code> で確認プロンプトを使う
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <blockquote>
                                <strong>共通の心得：</strong>
                                破壊的な操作（削除・上書き・強制終了）を行うワンライナーは、必ず「確認だけ行うバージョン」を先に実行してから、本番の操作に進む習慣をつけましょう。
                            </blockquote>
                        </section>

                        {/* ============ 14. クイックリファレンス ============ */}
                        <section id="sec-quickref" tabIndex={-1}>
                            <h2><span className="num">14.</span> クイックリファレンス表</h2>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">カテゴリ</th>
                                            <th scope="col">主なコマンド</th>
                                            <th scope="col">代表的な用途</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ファイル探索</td>
                                            <td><code>find</code>, <code>xargs</code></td>
                                            <td>条件検索、一括処理</td>
                                        </tr>
                                        <tr>
                                            <td>テキスト検索</td>
                                            <td><code>grep</code></td>
                                            <td>パターン検索、ログ調査</td>
                                        </tr>
                                        <tr>
                                            <td>テキスト変換</td>
                                            <td><code>sed</code></td>
                                            <td>置換、抽出、一括編集</td>
                                        </tr>
                                        <tr>
                                            <td>テキスト集計</td>
                                            <td>
                                                <code>awk</code>, <code>sort</code>, <code>uniq</code>,
                                                <code>cut</code>, <code>wc</code>
                                            </td>
                                            <td>集計、レポート作成</td>
                                        </tr>
                                        <tr>
                                            <td>プロセス管理</td>
                                            <td>
                                                <code>ps</code>, <code>top</code>, <code>kill</code>,
                                                <code>lsof</code>, <code>pgrep</code>
                                            </td>
                                            <td>負荷調査、プロセス制御</td>
                                        </tr>
                                        <tr>
                                            <td>ネットワーク診断</td>
                                            <td>
                                                <code>curl</code>, <code>ss</code>, <code>dig</code>,
                                                <code>ping</code>
                                            </td>
                                            <td>疎通確認、API検証</td>
                                        </tr>
                                        <tr>
                                            <td>ディスク・システム</td>
                                            <td><code>df</code>, <code>du</code>, <code>free</code></td>
                                            <td>容量調査、リソース監視</td>
                                        </tr>
                                        <tr>
                                            <td>バージョン管理</td>
                                            <td><code>git</code></td>
                                            <td>履歴管理、ブランチ運用</td>
                                        </tr>
                                        <tr>
                                            <td>コンテナ管理</td>
                                            <td><code>docker</code></td>
                                            <td>コンテナ・イメージ運用</td>
                                        </tr>
                                        <tr>
                                            <td>ログ調査</td>
                                            <td><code>journalctl</code>, <code>tail</code></td>
                                            <td>リアルタイム監視、障害調査</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* ============ 15. 参考文献 ============ */}
                        <section id="sec-sources" tabIndex={-1}>
                            <h2><span className="num">15.</span> 参考文献・信頼できる情報源</h2>
                            <p>
                                本ガイドの解説・構文は、以下の一次情報源（公式マニュアル・man
                                page）を根拠としています。
                            </p>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">コマンド</th>
                                            <th scope="col">出典</th>
                                            <th scope="col">URL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>grep</td>
                                            <td>GNU Grep Manual（Free Software Foundation）</td>
                                            <td>
                                                <a
                                                    href="https://www.gnu.org/software/grep/manual/grep.html"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    gnu.org/software/grep/manual/grep.html
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>sed</td>
                                            <td>GNU sed Manual（Free Software Foundation）</td>
                                            <td>
                                                <a
                                                    href="https://www.gnu.org/software/sed/manual/sed.html"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    gnu.org/software/sed/manual/sed.html
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>awk (gawk)</td>
                                            <td>
                                                GAWK: Effective AWK Programming（Free Software
                                                Foundation）
                                            </td>
                                            <td>
                                                <a
                                                    href="https://www.gnu.org/software/gawk/manual/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    gnu.org/software/gawk/manual
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>find, xargs</td>
                                            <td>GNU Findutils Manual（Free Software Foundation）</td>
                                            <td>
                                                <a
                                                    href="https://www.gnu.org/software/findutils/manual/html_mono/find.html"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    gnu.org/software/findutils/manual
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>sort, uniq, cut, wc, df, du, free</td>
                                            <td>GNU Coreutils Manual（Free Software Foundation）</td>
                                            <td>
                                                <a
                                                    href="https://www.gnu.org/software/coreutils/manual/coreutils.html"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    gnu.org/software/coreutils/manual
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>xargs (man)</td>
                                            <td>Linux man-pages project</td>
                                            <td>
                                                <a
                                                    href="https://man7.org/linux/man-pages/man1/xargs.1.html"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    man7.org/.../xargs.1.html
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>lsof</td>
                                            <td>Linux man-pages project</td>
                                            <td>
                                                <a
                                                    href="https://man7.org/linux/man-pages/man8/lsof.8.html"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    man7.org/.../lsof.8.html
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>ss</td>
                                            <td>Linux man-pages project（iproute2）</td>
                                            <td>
                                                <a
                                                    href="https://man7.org/linux/man-pages/man8/ss.8.html"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    man7.org/.../ss.8.html
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>curl</td>
                                            <td>Linux man-pages project</td>
                                            <td>
                                                <a
                                                    href="https://man7.org/linux/man-pages/man1/curl.1.html"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    man7.org/.../curl.1.html
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>journalctl</td>
                                            <td>Linux man-pages project（systemd）</td>
                                            <td>
                                                <a
                                                    href="https://man7.org/linux/man-pages/man1/journalctl.1.html"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    man7.org/.../journalctl.1.html
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>git</td>
                                            <td>Git公式ドキュメント</td>
                                            <td>
                                                <a
                                                    href="https://git-scm.com/docs"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    git-scm.com/docs
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>docker</td>
                                            <td>Docker公式ドキュメント</td>
                                            <td>
                                                <a
                                                    href="https://docs.docker.com/reference/cli/docker/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    docs.docker.com/reference/cli/docker
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <blockquote>
                                これらのURLは執筆時点（2026年7月）で確認済みですが、各プロジェクトのバージョンアップに伴いドキュメント構成が変わることがあります。最新情報は必ず公式サイトでご確認ください。
                            </blockquote>
                        </section>

                        <footer className="page-footer">
                            CLIコマンド実践ワンライナー集 — 初学者のためのステップバイステップガイド
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
