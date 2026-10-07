import React from 'react';
import CodeBlock from '../CodeBlock';
import { Diagram } from '../Diagram';

/**
 * Section4 component.
 */
export default function Section4() {
    return (
        <>
<section className="section" id="sec-7" tabIndex={-1}>{' '}<h1>第 4 章　Application Deployment and Security（配点 15%）</h1>{' '}<div className="prose">{' '}<h2>4.1 デプロイモデルとエッジコンピューティング</h2>{' '}<h3>デプロイモデルの比較</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">モデル</th><th scope="col">説明</th><th scope="col">長所</th><th scope="col">短所</th></tr></thead><tbody><tr><td>プライベートクラウド</td><td>自社（または専用）環境で構築するクラウド</td><td>統制・セキュリティを高めやすい</td><td>初期投資と運用負荷が大きい</td></tr><tr><td>パブリッククラウド</td><td>AWS、Azure、GCP など共有基盤</td><td>迅速・従量課金・拡張性</td><td>ベンダー依存、コスト管理が必要</td></tr><tr><td>ハイブリッドクラウド</td><td>上記の組み合わせ</td><td>用途ごとに最適化</td><td>連携・運用が複雑</td></tr><tr><td>エッジ</td><td>データ発生源に近い場所で処理</td><td>低遅延、帯域節約、オフライン耐性</td><td>多拠点の管理が難しい</td></tr></tbody></table>{' '}</div>{' '}<h3>エッジコンピューティングの利点</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">利点</th><th scope="col">説明</th></tr></thead><tbody><tr><td>低遅延</td><td>中央のクラウドまで往復しないため応答が速い</td></tr><tr><td>帯域の節約</td><td>生データを全て送らず、要約や結果のみ送信</td></tr><tr><td>信頼性</td><td>WAN 障害時も現地で処理を継続できる</td></tr><tr><td>データ主権・プライバシー</td><td>個人データを現地で処理し、外部送信を減らせる</td></tr></tbody></table>{' '}</div>{' '}<Diagram id="dg17" />{' '}<h2>4.2 仮想マシン・ベアメタル・コンテナ</h2>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">観点</th><th scope="col">ベアメタル</th><th scope="col">仮想マシン（VM）</th><th scope="col">コンテナ</th></tr></thead><tbody><tr><td>実行単位</td><td>物理サーバーに OS を直接</td><td>ハイパーバイザー上のゲスト OS</td><td>ホスト OS のカーネルを共有するプロセス</td></tr><tr><td>起動速度</td><td>遅い</td><td>数十秒〜分</td><td><strong>秒以下</strong></td></tr><tr><td>リソース効率</td><td>専有（性能は最大）</td><td>OS ごとに消費</td><td><strong>軽量</strong></td></tr><tr><td>分離度</td><td>物理的に分離</td><td>強い</td><td>VM より弱い（カーネル共有）</td></tr><tr><td>可搬性</td><td>低い</td><td>中</td><td><strong>高い</strong>（イメージで配布）</td></tr><tr><td>向く場面</td><td>高性能・専用ハードウェア</td><td>異なる OS の混在、強い分離</td><td>マイクロサービス、CI/CD、素早い展開</td></tr></tbody></table>{' '}</div>{' '}<Diagram id="dg18" />{' '}<h2>4.3 CI/CD パイプライン</h2>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">用語</th><th scope="col">意味</th></tr></thead><tbody><tr><td><strong>CI</strong>（継続的インテグレーション）</td><td>{' '}コード変更のたびに自動でビルド・テストし、早期に問題を検出{' '}</td></tr><tr><td><strong>CD</strong>（継続的デリバリー／デプロイ）</td><td>{' '}テスト済みの成果物を自動で（または承認を経て）環境へ展開{' '}</td></tr></tbody></table>{' '}</div>{' '}<Diagram id="dg19" />{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">パイプラインの構成要素</th><th scope="col">役割</th><th scope="col">代表例</th></tr></thead><tbody><tr><td>ソース管理</td><td>変更のトリガー</td><td>Git（GitHub、GitLab）</td></tr><tr><td>CI サーバー／ランナー</td><td>ジョブの実行</td><td>GitLab CI、Jenkins、GitHub Actions</td></tr><tr><td>テスト</td><td>品質の担保</td><td>unittest、pytest</td></tr><tr><td>成果物レジストリ</td><td>イメージ・パッケージの保管</td><td>コンテナレジストリ</td></tr><tr><td>デプロイ自動化</td><td>環境への展開</td><td>Ansible、Terraform、kubectl</td></tr><tr><td>監視</td><td>稼働状況の可視化</td><td>ログ、メトリクス、アラート</td></tr></tbody></table>{' '}</div>{' '}<div className="callout practice">{' '}<h3 className="callout-title"><i className="ti ti-bulb"></i>ベストプラクティス</h3>{' '}<ul>{' '}<li>{' '}パイプラインの設定自体もコード化して Git 管理する（Pipeline as
                                Code）。{' '}</li>{' '}<li>{' '}失敗したら<strong>すぐに通知</strong>し、壊れたビルドを放置しない。{' '}</li>{' '}<li>{' '}秘密情報はパイプラインのシークレット機能（変数の保護／マスク）に保存する。{' '}</li>{' '}<li>小さな変更を頻繁にデプロイし、ロールバック手順も用意する。</li>{' '}</ul>{' '}</div>{' '}<h2>4.4 Python の単体テスト</h2>{' '}<h3><code>unittest</code>{' '}の基本</h3>{' '}<CodeBlock
    lang="python"
    lines={[
        "# vlan.py",
        "def add_vlan(vlans, vlan_id):",
        "    if not 1 <= vlan_id <= 4094:",
        "        raise ValueError(\"VLAN ID must be 1-4094\")",
        "    return vlans | {vlan_id}",
    ]}
/>{' '}<CodeBlock
    lang="python"
    lines={[
        "# test_vlan.py",
        "import unittest",
        "from vlan import add_vlan",
        "",
        "class TestAddVlan(unittest.TestCase):",
        "    def test_add_valid(self):",
        "        self.assertEqual(add_vlan({10}, 20), {10, 20})",
        "",
        "    def test_out_of_range(self):",
        "        with self.assertRaises(ValueError):",
        "            add_vlan({10}, 5000)",
        "",
        "if __name__ == \"__main__\":",
        "    unittest.main()",
    ]}
/>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">よく使うアサート</th><th scope="col">意味</th></tr></thead><tbody><tr><td><code>assertEqual(a, b)</code></td><td>a と b が等しい</td></tr><tr><td>{' '}<code>assertTrue(x)</code>{' '}/{' '}<code>assertFalse(x)</code>{' '}</td><td>真／偽</td></tr><tr><td><code>assertIn(a, b)</code></td><td>a が b に含まれる</td></tr><tr><td><code>assertRaises(Err)</code></td><td>例外が発生する</td></tr></tbody></table>{' '}</div>{' '}<h3>外部 API を使うコードのテスト（モック）</h3>{' '}<p>実際の API を呼ばずに、戻り値を差し替えてテストします。</p>{' '}<CodeBlock
    lang="python"
    lines={[
        "from unittest import TestCase",
        "from unittest.mock import patch, Mock",
        "import my_client",
        "",
        "class TestClient(TestCase):",
        "    @patch(\"my_client.requests.get\")",
        "    def test_get_devices(self, mock_get):",
        "        mock_get.return_value = Mock(status_code=200, json=lambda: [{\"name\": \"sw01\"}])",
        "        result = my_client.get_devices()",
        "        self.assertEqual(result[0][\"name\"], \"sw01\")",
    ]}
/>{' '}<div className="callout practice">{' '}<h3 className="callout-title"><i className="ti ti-bulb"></i>ベストプラクティス</h3>{' '}<ul>{' '}<li>{' '}<strong>1 テスト 1 検証</strong>、名前は{' '}<code>test_何をすると何になる</code>{' '}にする。{' '}</li>{' '}<li>正常系だけでなく、<strong>境界値と異常系</strong>をテストする。</li>{' '}<li>{' '}テストは順序に依存させず、外部環境（ネットワーク、時刻）を切り離す。{' '}</li>{' '}</ul>{' '}</div>{' '}<h2>4.5 Docker</h2>{' '}<h3>基本概念</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">用語</th><th scope="col">意味</th></tr></thead><tbody><tr><td>Dockerfile</td><td>イメージの作り方を書いたテキスト</td></tr><tr><td>イメージ</td><td>アプリと依存関係を固めた読み取り専用のテンプレート</td></tr><tr><td>コンテナ</td><td>イメージから起動した実行中のインスタンス</td></tr><tr><td>レジストリ</td><td>イメージの保管場所（Docker Hub など）</td></tr></tbody></table>{' '}</div>{' '}<Diagram id="dg20" />{' '}<h3>Dockerfile の読み方</h3>{' '}<CodeBlock
    lang="dockerfile"
    lines={[
        "FROM python:3.12-slim",
        "WORKDIR /app",
        "COPY requirements.txt .",
        "RUN pip install --no-cache-dir -r requirements.txt",
        "COPY . .",
        "ENV APP_ENV=production",
        "EXPOSE 8080",
        "RUN useradd --create-home appuser",
        "USER appuser",
        "CMD [\"python\", \"app.py\"]",
    ]}
/>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">命令</th><th scope="col">意味</th></tr></thead><tbody><tr><td><code>FROM</code></td><td>ベースイメージの指定</td></tr><tr><td><code>WORKDIR</code></td><td>作業ディレクトリの設定</td></tr><tr><td><code>COPY</code></td><td>ホストからイメージへファイルをコピー</td></tr><tr><td><code>RUN</code></td><td>{' '}<strong>ビルド時</strong>にコマンド実行（パッケージ導入など）{' '}</td></tr><tr><td><code>ENV</code></td><td>環境変数の設定</td></tr><tr><td><code>EXPOSE</code></td><td>{' '}使用するポートの<strong>宣言</strong>（公開はしない。<code>-p</code>{' '}が必要）{' '}</td></tr><tr><td><code>USER</code></td><td>実行ユーザーの指定</td></tr><tr><td><code>CMD</code></td><td><strong>コンテナ起動時</strong>の既定コマンド</td></tr><tr><td><code>ENTRYPOINT</code></td><td>{' '}起動時に必ず実行するコマンド（<code>CMD</code>{' '}は引数の既定値になる）{' '}</td></tr></tbody></table>{' '}</div>{' '}<h3>主要コマンド</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">コマンド</th><th scope="col">説明</th></tr></thead><tbody><tr><td><code>docker build -t myapp:1.0 .</code></td><td>イメージをビルド</td></tr><tr><td><code>docker images</code></td><td>イメージ一覧</td></tr><tr><td>{' '}<code>docker run -d -p 8080:8080 --name web myapp:1.0</code>{' '}</td><td>{' '}バックグラウンド起動し、ホスト 8080 をコンテナ 8080 へ転送{' '}</td></tr><tr><td><code>docker ps</code>{' '}/{' '}<code>docker ps -a</code></td><td>実行中／すべてのコンテナ</td></tr><tr><td><code>docker logs web</code></td><td>ログ表示</td></tr><tr><td><code>docker exec -it web sh</code></td><td>コンテナ内でシェルを実行</td></tr><tr><td>{' '}<code>docker stop web</code>{' '}/{' '}<code>docker rm web</code>{' '}</td><td>停止／削除</td></tr><tr><td>{' '}<code>docker pull &lt;image&gt;</code>{' '}/{' '}<code>docker push &lt;image&gt;</code>{' '}</td><td>取得／送信</td></tr></tbody></table>{' '}</div>{' '}<p>{' '}<code>-p ホスト側ポート:コンテナ側ポート</code>{' '}の並び順は頻出の引っかけです。{' '}</p>{' '}<div className="callout practice">{' '}<h3 className="callout-title"><i className="ti ti-bulb"></i>ベストプラクティス</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">{' '}項目{' '}</th><th scope="col">{' '}推奨{' '}</th></tr></thead><tbody><tr><td>{' '}ベースイメージ{' '}</td><td>{' '}公式・軽量（<code>slim</code>、<code>alpine</code>）を選び、<strong>タグを固定</strong>（<code>latest</code>{' '}を避ける）{' '}</td></tr><tr><td>{' '}実行ユーザー{' '}</td><td>{' '}<strong>root で動かさない</strong>（<code>USER</code>{' '}を指定）{' '}</td></tr><tr><td>{' '}レイヤー{' '}</td><td>{' '}変更が少ない命令（依存導入）を先に書き、キャッシュを効かせる{' '}</td></tr><tr><td>{' '}秘密情報{' '}</td><td>{' '}イメージに埋め込まない（環境変数・シークレット管理で実行時に渡す）{' '}</td></tr><tr><td>{' '}<code>.dockerignore</code>{' '}</td><td>{' '}不要なファイル（<code>.git</code>、<code>.env</code>）を含めない{' '}</td></tr><tr><td>{' '}脆弱性{' '}</td><td>{' '}イメージをスキャンし、定期的に更新{' '}</td></tr></tbody></table>{' '}</div>{' '}</div>{' '}<h2>4.6 アプリケーションセキュリティ</h2>{' '}<h3>秘密情報（シークレット）の保護</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">やってはいけない</th><th scope="col">推奨</th></tr></thead><tbody><tr><td>ソースコードにパスワードや API キーを直書き</td><td>環境変数、シークレット管理サービス、CI の保護変数</td></tr><tr><td>秘密情報を Git にコミット</td><td>{' '}<code>.gitignore</code>{' '}に登録、漏えいしたら<strong>キーを失効して再発行</strong>{' '}</td></tr><tr><td>ログに秘密情報を出力</td><td>マスキングする</td></tr><tr><td>全員が同じ強い権限のキーを共有</td><td>用途別・最小権限のキーを発行、定期ローテーション</td></tr></tbody></table>{' '}</div>{' '}<h3>暗号化：保存時と通信時</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">種類</th><th scope="col">守る対象</th><th scope="col">代表技術</th></tr></thead><tbody><tr><td>保存時の暗号化（Encryption at rest）</td><td>ディスク、DB、バックアップ内のデータ</td><td>AES によるディスク／DB 暗号化</td></tr><tr><td>通信時の暗号化（Encryption in transit）</td><td>ネットワーク上を流れるデータ</td><td><strong>TLS（HTTPS）</strong>、SSH、IPsec VPN</td></tr><tr><td>パスワードの保存</td><td>認証情報</td><td>{' '}<strong>ソルト付きハッシュ</strong>（bcrypt、Argon2
                                        など）。暗号化ではなくハッシュ{' '}</td></tr></tbody></table>{' '}</div>{' '}<h3>データの取り扱い</h3>{' '}<ul>{' '}<li>収集するデータを最小限にし、個人情報は分類して保護する。</li>{' '}<li>{' '}入力値は<strong>必ず検証・サニタイズ</strong>し、出力時は<strong>エスケープ</strong>する。{' '}</li>{' '}<li>不要になったデータは削除し、保持期間を決める。</li>{' '}</ul>{' '}<h2>4.7 ファイアウォール・DNS・ロードバランサー・リバースプロキシ</h2>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">要素</th><th scope="col">役割</th><th scope="col">アプリ配備での使いどころ</th></tr></thead><tbody><tr><td><strong>ファイアウォール</strong></td><td>許可された通信のみ通す（IP、ポート、アプリ層で制御）</td><td>公開が必要なポートだけ開放、内部を保護</td></tr><tr><td><strong>DNS</strong></td><td>{' '}名前（<code>app.example.com</code>）を IP アドレスへ解決{' '}</td><td>サービスの名前解決、切り替え</td></tr><tr><td><strong>ロードバランサー</strong></td><td>複数サーバーへ通信を分散、死活監視</td><td>可用性・性能の向上</td></tr><tr><td><strong>リバースプロキシ</strong></td><td>{' '}クライアントの代理としてサーバーの前で要求を受け、内部サーバーへ転送{' '}</td><td>TLS 終端、キャッシュ、認証、内部構成の隠蔽</td></tr></tbody></table>{' '}</div>{' '}<Diagram id="dg21" />{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">比較</th><th scope="col">違い</th></tr></thead><tbody><tr><td>プロキシとリバースプロキシ</td><td>{' '}プロキシ＝<strong>クライアント側</strong>の代理／リバースプロキシ＝<strong>サーバー側</strong>の代理{' '}</td></tr><tr><td>ロードバランサーとリバースプロキシ</td><td>{' '}LB は分散が主目的。リバースプロキシは分散に加え TLS
                                        終端やキャッシュ等も担う（製品では両方を兼ねることが多い）{' '}</td></tr></tbody></table>{' '}</div>{' '}<h2>4.8 OWASP の主要な脅威</h2>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">脅威</th><th scope="col">仕組み</th><th scope="col">対策</th></tr></thead><tbody><tr><td><strong>XSS</strong>（クロスサイトスクリプティング）</td><td>{' '}攻撃者の<strong>スクリプトを Web ページに埋め込み</strong>、閲覧者のブラウザで実行させる{' '}</td><td>{' '}出力時の<strong>エスケープ</strong>、入力検証、CSP（Content
                                        Security Policy）、Cookie の{' '}<code>HttpOnly</code>{' '}</td></tr><tr><td><strong>SQL インジェクション</strong></td><td>入力値に SQL を混入させ、DB を不正操作</td><td>{' '}<strong>プレースホルダ（パラメータ化クエリ）</strong>、ORM、最小権限の DB アカウント{' '}</td></tr><tr><td>{' '}<strong>CSRF</strong>（クロスサイトリクエストフォージェリ）{' '}</td><td>{' '}ログイン中のユーザーに<strong>意図しないリクエストを送らせる</strong>{' '}</td><td>{' '}<strong>CSRF トークン</strong>、<code>SameSite</code>{' '}Cookie、重要操作での再認証{' '}</td></tr></tbody></table>{' '}</div>{' '}<h3>SQL インジェクションの対策例</h3>{' '}<CodeBlock
    lang="python"
    lines={[
        "# 悪い例：文字列連結（脆弱）",
        "cursor.execute(\"SELECT * FROM users WHERE name = '\" + name + \"'\")",
        "",
        "# 良い例：プレースホルダ",
        "cursor.execute(\"SELECT * FROM users WHERE name = %s\", (name,))",
    ]}
/>
{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">3 つの区別</th><th scope="col">キーワード</th></tr></thead><tbody><tr><td>XSS</td><td><strong>ブラウザ上でスクリプトが実行される</strong></td></tr><tr><td>SQL インジェクション</td><td><strong>DB に不正な SQL が届く</strong></td></tr><tr><td>CSRF</td><td>{' '}<strong>ユーザーの権限で勝手にリクエストが送られる</strong>{' '}</td></tr></tbody></table>{' '}</div>{' '}<h2>4.9 Bash の基本</h2>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">目的</th><th scope="col">コマンド</th><th scope="col">例</th></tr></thead><tbody><tr><td>現在地の確認</td><td><code>pwd</code></td><td><code>{"/home/<username>/"}</code></td></tr><tr><td>移動</td><td><code>cd</code></td><td>{' '}<code>cd /var/log</code>、<code>cd ..</code>、<code>cd ~</code>{' '}</td></tr><tr><td>一覧</td><td><code>ls</code></td><td>{' '}<code>ls -l</code>（詳細）、<code>ls -a</code>（隠しファイル）{' '}</td></tr><tr><td>ディレクトリ作成</td><td><code>mkdir</code></td><td><code>mkdir -p a/b/c</code></td></tr><tr><td>コピー／移動／削除</td><td><code>cp</code>{' '}/{' '}<code>mv</code>{' '}/{' '}<code>rm</code></td><td><code>cp a.txt b.txt</code>、<code>rm -r dir</code></td></tr><tr><td>内容表示</td><td>{' '}<code>cat</code>、<code>less</code>、<code>head</code>、<code>tail</code>{' '}</td><td><code>tail -f app.log</code></td></tr><tr><td>検索</td><td><code>grep</code></td><td><code>grep -i error app.log</code></td></tr><tr><td>権限</td><td><code>chmod</code></td><td><code>chmod +x script.sh</code></td></tr><tr><td>環境変数の設定／参照</td><td><code>export</code>、<code>echo</code></td><td>{' '}<code>export API_KEY=xxxx</code>{' '}／{' '}<code>echo $API_KEY</code>{' '}</td></tr><tr><td>環境変数の一覧</td><td><code>env</code>、<code>printenv</code></td><td></td></tr></tbody></table>{' '}</div>{' '}
<CodeBlock
    lang="bash"
    lines={[
        "#!/bin/bash",
        "set -euo pipefail                         # エラーで停止、未定義変数はエラー",
        "",
        "LOG_DIR=\"/var/log/myapp\"",
        "mkdir -p \"$LOG_DIR\"",
        "cd \"$LOG_DIR\"",
        "",
        "for f in *.log; do",
        "    gzip \"$f\"",
        "done",
        "echo \"圧縮が完了しました\"",
    ]}
/>{' '}<div className="callout practice">{' '}<h3 className="callout-title"><i className="ti ti-bulb"></i>ベストプラクティス</h3>{' '}<ul>{' '}<li>{' '}変数は必ずダブルクォートで囲む（<code>&quot;$VAR&quot;</code>）。スペースを含む値で壊れにくい。{' '}</li>{' '}<li><code>rm -rf</code>{' '}は対象を確認してから実行する。</li>{' '}<li>パスワードをコマンドライン引数や履歴に残さない。</li>{' '}</ul>{' '}</div>{' '}<h2>4.10 DevOps の原則</h2>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">原則</th><th scope="col">内容</th></tr></thead><tbody><tr><td>文化（Culture）</td><td>開発と運用が協力し、責任を共有</td></tr><tr><td>自動化（Automation）</td><td>ビルド、テスト、デプロイ、構成を自動化</td></tr><tr><td>リーン（Lean）</td><td>ムダを排除し、小さく速く価値を届ける</td></tr><tr><td>計測（Measurement）</td><td>メトリクスで改善を判断</td></tr><tr><td>共有（Sharing）</td><td>知識・ツール・失敗事例を共有</td></tr></tbody></table>{' '}</div>{' '}<Diagram id="dg22" />{' '}<p>{' '}補足：<strong>Twelve-Factor App</strong>（設定は環境変数、ログは標準出力、依存を明示など）は、クラウドネイティブなアプリ設計の指針として有名です。{' '}</p>{' '}<h3>確認問題（第 4 章）</h3>{' '}<ol>{' '}<li>{' '}<code>docker run -p 8080:80 nginx</code>{' '}のとき、ホストのどのポートにアクセスすると nginx（コンテナの 80
                            番）へ届くか。{' '}</li>{' '}<li>Dockerfile の{' '}<code>RUN</code>{' '}と{' '}<code>CMD</code>{' '}の違いは何か。</li>{' '}<li>SQL インジェクションの最も基本的な対策は何か。</li>{' '}<li>{' '}ロードバランサーとリバースプロキシで、TLS
                            終端やキャッシュも担うのはどちらの機能か。{' '}</li>{' '}</ol>{' '}<div className="callout source">{' '}<h3 className="callout-title">{' '}<i className="ti ti-external-link"></i>第 4 章の参考ソース{' '}</h3>{' '}<div className="refs">{' '}<div className="ref">{' '}<span className="badge">1</span>{' '}<div className="ref-body">{' '}<div className="ref-title">Cisco Exam Topics（200-901）</div>{' '}<a href="https://www.cisco.com/c/dam/en_us/training-events/le31/le46/cln/marketing/exam-topics/200-901-DEVASC.pdf" rel="noopener noreferrer" target="_blank">https://www.cisco.com/c/dam/en_us/training-events/le31/le46/cln/marketing/exam-topics/200-901-DEVASC.pdf</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">2</span>{' '}<div className="ref-body">{' '}<div className="ref-title">Docker ドキュメント</div>{' '}<a href="https://docs.docker.com/" rel="noopener noreferrer" target="_blank">https://docs.docker.com/</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">3</span>{' '}<div className="ref-body">{' '}<div className="ref-title">Dockerfile リファレンス</div>{' '}<a href="https://docs.docker.com/reference/dockerfile/" rel="noopener noreferrer" target="_blank">https://docs.docker.com/reference/dockerfile/</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">4</span>{' '}<div className="ref-body">{' '}<div className="ref-title">OWASP Top 10</div>{' '}<a href="https://owasp.org/www-project-top-ten/" rel="noopener noreferrer" target="_blank">https://owasp.org/www-project-top-ten/</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">5</span>{' '}<div className="ref-body">{' '}<div className="ref-title">OWASP Cheat Sheet Series</div>{' '}<a href="https://cheatsheetseries.owasp.org/" rel="noopener noreferrer" target="_blank">https://cheatsheetseries.owasp.org/</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">6</span>{' '}<div className="ref-body">{' '}<div className="ref-title">Python unittest</div>{' '}<a href="https://docs.python.org/3/library/unittest.html" rel="noopener noreferrer" target="_blank">https://docs.python.org/3/library/unittest.html</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">7</span>{' '}<div className="ref-body">{' '}<div className="ref-title">GNU Bash マニュアル</div>{' '}<a href="https://www.gnu.org/software/bash/manual/" rel="noopener noreferrer" target="_blank">https://www.gnu.org/software/bash/manual/</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">8</span>{' '}<div className="ref-body">{' '}<div className="ref-title">The Twelve-Factor App（日本語）</div>{' '}<a href="https://12factor.net/ja/" rel="noopener noreferrer" target="_blank">https://12factor.net/ja/</a>{' '}</div>{' '}</div>{' '}</div>{' '}</div>{' '}</div>{' '}</section>
        </>
    );
}
