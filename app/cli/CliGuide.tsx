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
                                <code>$(コマンド)</code>
                                は「コマンドの実行結果を文字列として埋め込む」構文です。一方
                                <code>xargs</code>
                                は「パイプで受け取った一覧を、後続コマンドの<strong>引数</strong>として渡す」ためのブリッジ役です。この違いを理解すると、
                                <code>find</code>
                                や <code>grep</code> の結果を他のコマンドに渡す際に迷わなくなります。
                            </p>

                            <div className="code-block" role="region" aria-label="コマンド置換とxargsの例">
                                <div className="code-line"><span className="code-comment"># コマンド置換：結果を1つの文字列として埋め込む</span></div>
                                <div className="code-line">kill $(pgrep -f my_app)</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="code-comment"># xargs：一覧（複数行）を引数化して繰り返し実行</span></div>
                                <div className="code-line">find . -name &quot;*.log&quot; | xargs rm</div>
                                <div className="code-line"></div>
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
                                <code>find</code>
                                はディレクトリツリーを条件付きで探索するコマンド、<code>xargs</code>
                                はその結果を後続コマンドに渡すコマンドです（出典：GNU Findutils
                                マニュアル）。
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
                                <code>grep</code>
                                はパターンマッチによりテキストの中から一致する行を検索するコマンドです（出典：GNU
                                Grep マニュアル）。
                            </p>

                            <h3>3.1 基本構文</h3>
                            <div className="code-block" role="region" aria-label="grepの基本構文">
                                <div className="code-line">grep [オプション] &quot;検索パターン&quot; [対象ファイル]</div>
                                <div className="code-line"></div>
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
                                <code>sed</code>（stream
                                editor）はテキストをストリームとして1行ずつ処理し、置換・削除・抽出を行うコマンドです（出典：GNU
                                sed マニュアル）。
                            </p>

                            <h3>4.1 基本構文</h3>
                            <div className="code-block" role="region" aria-label="sedの基本構文">
                                <div className="code-line">sed &apos;s/検索文字列/置換文字列/フラグ&apos; ファイル</div>
                                <div className="code-line"></div>
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
                                <code>awk</code>
                                はフィールド（列）ベースでテキストを処理するプログラミング言語であり、集計・レポート作成に強みがあります（出典：GNU
                                Awk User&apos;s
                                Guide）。<code>sort</code>・<code>uniq</code>・<code>cut</code>・
                                <code>wc</code>
                                は GNU Coreutils に含まれる定番の集計系コマンドです（出典：GNU Coreutils
                                マニュアル）。
                            </p>

                            <h3>5.1 基本構文</h3>
                            <div className="code-block" role="region" aria-label="awkの基本構文">
                                <div className="code-line">awk -F&apos;区切り文字&apos; &apos;条件 &#123;処理&#125;&apos; ファイル</div>
                                <div className="code-line"></div>
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
                    </div>
                </main>
            </div>
        </div>
    );
}
