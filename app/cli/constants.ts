/**
 * CLIコマンド実践ワンライナー集 定数定義
 */

export interface NavItem {
    id: string;
    label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
    { id: 'sec-basics', label: '1. 基礎知識：仕組みを理解する' },
    { id: 'sec-find', label: '2. ファイル探索：find / xargs' },
    { id: 'sec-grep', label: '3. テキスト検索：grep' },
    { id: 'sec-sed', label: '4. テキスト変換：sed' },
    { id: 'sec-awk', label: '5. テキスト集計：awk / sort / uniq' },
    { id: 'sec-ps', label: '6. プロセス管理：ps / top / kill / lsof' },
    { id: 'sec-net', label: '7. ネットワーク診断：curl / ss / dig' },
    { id: 'sec-disk', label: '8. ディスク・システム情報' },
    { id: 'sec-git', label: '9. Git実践ワンライナー' },
    { id: 'sec-docker', label: '10. Docker実践ワンライナー' },
    { id: 'sec-log', label: '11. ログ調査：journalctl / tail' },
    { id: 'sec-scenario', label: '12. 組み合わせ実践シナリオ' },
    { id: 'sec-safety', label: '13. 安全に使うためのベストプラクティス' },
    { id: 'sec-quickref', label: '14. クイックリファレンス表' },
    { id: 'sec-sources', label: '15. 参考文献・情報源' },
] as const;

export type DiagramId =
    | 'diag-streams'
    | 'diag-find'
    | 'diag-log-pipeline'
    | 'diag-process'
    | 'diag-network'
    | 'diag-scenario-a'
    | 'diag-scenario-b';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-streams': `flowchart LR
A[標準入力 stdin] --> B[コマンド1]
B -->|標準出力 stdout| C[パイプの記号で連結]
C --> D[コマンド2]
B -->|標準エラー stderr| E[2で始まる記号で別途リダイレクト]
D -->|標準出力 stdout| F[画面へ表示]
F -->|大なり記号でリダイレクト| G[(ファイルへ保存)]`,

    'diag-find': `flowchart TD
A["find で対象ファイルを探す"] --> B{"結果に対して何をする?"}
B -->|一覧を見るだけ| C["find ... -print (デフォルト動作)"]
B -->|大量件数を安全・高速に一括処理| D["find ... -exec コマンド {} + などの安全な構成"]
B -->|xargs を使用してパイプライン処理| E["find ... -print0 パイプ xargs -0 コマンド"]
E --> F{"ファイル名に空白・改行・引用符・バックスラッシュの可能性は?"}
F -->|ある| G["必ず -print0 と xargs -0 を組み合わせる"]
F -->|ない場合でも推奨| H["安全のため -exec ... {} + または -print0 | xargs -0 を基本とする"]`,

    'diag-log-pipeline': `flowchart LR
A[access.log] --> B[grep で対象パターンを抽出]
B --> C[awk で必要なフィールドを取り出す]
C --> D[sort で並び替え]
D --> E[uniq -c で件数を集計]
E --> F[sort -rn で降順に並び替え]
F --> G[head で上位のみ表示]`,

    'diag-process': `flowchart TD
A[サーバの動作が重いと感じる] --> B[top または ps aux で負荷の高いプロセスを特定]
B --> C{"CPUとメモリ どちらが原因か?"}
C -->|CPU| D["ps aux --sort=-%cpu | head"]
C -->|メモリ| E["ps aux --sort=-%mem | head"]
D --> F[該当PIDを確認]
E --> F
F --> G{"そのプロセスは安全に停止できるか?"}
G -->|Yes| H[kill -TERM PID で正常終了を試みる]
G -->|判断がつかない,応答なし| I[kill -KILL PID で強制終了]
H --> J[再度 ps top で状態を確認]
I --> J`,

    'diag-network': `flowchart TD
A[Webサービスに繋がらない] --> B[dig host で名前解決を確認]
B --> C{"正しいIPに解決されている?"}
C -->|No| D[DNS設定 or ホスト名設定を疑う]
C -->|Yes| E[ping host / IP で疎通確認]
E --> F{"応答がある?"}
F -->|No| G[ネットワーク経路 or ICMP/FW設定を疑う]
F -->|Yes| H[curl -I https の応答を確認]
H --> I{"ステータスコードは200番台か?"}
I -->|No| J[アプリケーション側のログを調査]
I -->|Yes| K[ss -tan でローカルのポート状態を確認]`,

    'diag-scenario-a': `flowchart TD
A[ディスク容量が逼迫しているとの警告] --> B["df -h でパーティション使用率を確認"]
B --> C["du -sh */ パイプ sort -rh パイプ head で肥大化ディレクトリを特定"]
C --> D["find . -type f -size +100M で個別の大きいファイルを特定"]
D --> E{"不要なファイルか?"}
E -->|Yes| F[バックアップを取ってから削除]
E -->|No| G[ログローテーション設定 or 外部ストレージへの移動を検討]`,

    'diag-scenario-b': `flowchart TD
A["Address already in use エラーで起動失敗"] --> B["lsof -i :8080 で使用中プロセスを特定"]
B --> C["ss -tlnp でも同様に確認できる"]
C --> D{"そのプロセスは今すぐ止めてよいか?"}
D -->|Yes| E["kill -TERM PID で正常終了"]
D -->|判断がつかない| F[担当者に確認、または別ポートで起動]
E --> G[再度サーバーを起動して確認]`,
};

export interface ReferenceItem {
    name: string;
    description: string;
    url: string;
    urlDisplay: string;
}

export const REFERENCES: readonly ReferenceItem[] = [
    {
        name: 'GNU Grep Manual',
        description: 'GNU公式マニュアル。基本構文、正規表現の仕様、オプション一覧を網羅。',
        url: 'https://www.gnu.org/software/grep/manual/grep.html',
        urlDisplay: 'gnu.org/software/grep/manual/grep.html',
    },
    {
        name: 'GNU Sed Manual',
        description: 'GNU公式マニュアル。ストリーム処理の基本から高度な置換・アドレス指定まで。',
        url: 'https://www.gnu.org/software/sed/manual/sed.html',
        urlDisplay: 'gnu.org/software/sed/manual/sed.html',
    },
    {
        name: 'GAWK: Effective AWK Programming',
        description: 'awkの決定版ガイド（GNU Awk公式）。パターン・アクション・組み込み変数の詳細。',
        url: 'https://www.gnu.org/software/gawk/manual/',
        urlDisplay: 'gnu.org/software/gawk/manual',
    },
    {
        name: 'GNU Findutils (find / xargs)',
        description: 'findおよびxargsの公式リファレンス。-print0と-0の安全な組み合わせの原典。',
        url: 'https://www.gnu.org/software/findutils/manual/html_mono/find.html',
        urlDisplay: 'gnu.org/software/findutils/manual',
    },
    {
        name: 'GNU Coreutils Manual',
        description: 'sort, uniq, cut, wc, df, du, head, tail などの基本ユーティリティ仕様。',
        url: 'https://www.gnu.org/software/coreutils/manual/coreutils.html',
        urlDisplay: 'gnu.org/software/coreutils/manual',
    },
    {
        name: 'Linux man pages: xargs(1)',
        description: 'Michael Kerrisk氏管理の標準Linux man pageプロジェクトによるxargsマニュアル。',
        url: 'https://man7.org/linux/man-pages/man1/xargs.1.html',
        urlDisplay: 'man7.org/.../xargs.1.html',
    },
    {
        name: 'Linux man pages: lsof(8)',
        description: 'ファイル・ソケット・ポートを保持しているプロセスを特定するための公式man。',
        url: 'https://man7.org/linux/man-pages/man8/lsof.8.html',
        urlDisplay: 'man7.org/.../lsof.8.html',
    },
    {
        name: 'Linux man pages: ss(8)',
        description: 'iproute2スイートに含まれるssコマンドのman page。netstat代替の推奨仕様。',
        url: 'https://man7.org/linux/man-pages/man8/ss.8.html',
        urlDisplay: 'man7.org/.../ss.8.html',
    },
    {
        name: 'Linux man pages: curl(1)',
        description: 'Daniel Stenberg氏によるcurlの完全オプションリファレンス。',
        url: 'https://man7.org/linux/man-pages/man1/curl.1.html',
        urlDisplay: 'man7.org/.../curl.1.html',
    },
    {
        name: 'systemd journalctl man page',
        description: 'systemdジャーナルログの閲覧・絞り込み構文を網羅した公式man。',
        url: 'https://man7.org/linux/man-pages/man1/journalctl.1.html',
        urlDisplay: 'man7.org/.../journalctl.1.html',
    },
    {
        name: 'Git Documentation',
        description: 'Git公式ドキュメント。log, status, branch, diff, stash などの一次情報。',
        url: 'https://git-scm.com/docs',
        urlDisplay: 'git-scm.com/docs',
    },
    {
        name: 'Docker CLI Reference',
        description: 'Docker公式コマンドリファレンス。ps, rm, rmi, system prune 等の詳細。',
        url: 'https://docs.docker.com/reference/cli/docker/',
        urlDisplay: 'docs.docker.com/reference/cli/docker',
    },
] as const;
