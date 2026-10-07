import React from 'react';
import CodeBlock from '../CodeBlock';
import { Diagram } from '../Diagram';

/**
 * Section5 component.
 */
export default function Section5() {
    return (
        <>
<section className="section" id="sec-8" tabIndex={-1}>{' '}<h1>第 5 章　Infrastructure and Automation（配点 20%）</h1>{' '}<div className="prose">{' '}<h2>5.1 モデル駆動プログラマビリティの価値</h2>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">従来（CLI 中心）</th><th scope="col">モデル駆動</th></tr></thead><tbody><tr><td>機器・OS ごとにコマンドが違う</td><td>{' '}<strong>標準化されたデータモデル（YANG）</strong>{' '}で統一{' '}</td></tr><tr><td>出力を文字列で解析（壊れやすい）</td><td><strong>構造化データ</strong>（JSON／XML）で取得</td></tr><tr><td>設定の成否判断が難しい</td><td>トランザクション・検証・ロールバックが可能</td></tr><tr><td>自動化の保守が大変</td><td>API・SDK と組み合わせやすい</td></tr></tbody></table>{' '}</div>{' '}<p>{' '}<strong>要点</strong>：ベンダー差や OS
                        バージョン差を吸収し、<strong>再現性の高い自動化</strong>を実現できることが価値です。{' '}</p>{' '}<h2>5.2 コントローラー型とデバイス型の管理</h2>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">観点</th><th scope="col">コントローラーレベル</th><th scope="col">デバイスレベル</th></tr></thead><tbody><tr><td>例</td><td>Catalyst Center、Meraki、APIC、vManage、NSO</td><td>各機器への SSH/CLI、NETCONF、RESTCONF</td></tr><tr><td>単位</td><td>ネットワーク全体・ポリシー</td><td>個別機器</td></tr><tr><td>利点</td><td>一括展開、一貫性、可視化、ワークフロー</td><td>細かい制御、コントローラーがない環境でも可</td></tr><tr><td>課題</td><td>コントローラーへの依存、対応機能の範囲</td><td>台数が増えると運用が大変、個別の差異管理</td></tr></tbody></table>{' '}</div>{' '}<Diagram id="dg23" />{' '}<h2>5.3 ネットワークのシミュレーションとテストツール</h2>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">ツール</th><th scope="col">役割</th></tr></thead><tbody><tr><td><strong>Cisco Modeling Labs（CML）</strong></td><td>{' '}仮想ネットワークトポロジーを作成し、実機に近い OS
                                        イメージで検証（旧 VIRL の後継）{' '}</td></tr><tr><td><strong>pyATS</strong></td><td>{' '}Python
                                        ベースのネットワークテスト自動化フレームワーク。機器の状態取得、パース、テストの自動化{' '}</td></tr><tr><td><strong>Genie</strong>（pyATS のライブラリ群）</td><td>{' '}CLI
                                        出力の構造化パーサーや、設定・状態の比較（スナップショット差分）{' '}</td></tr></tbody></table>{' '}</div>{' '}<Diagram id="dg24" />{' '}<p>{' '}<strong>ベストプラクティス</strong>：本番へ入れる前に、必ずシミュレーション環境で<strong>変更前後の状態比較</strong>（pre/post
                        チェック）を行う。{' '}</p>{' '}<h2>5.4 インフラ自動化における CI/CD</h2>{' '}<p>{' '}アプリと同様に、ネットワーク設定変更も{' '}<strong>Git → 自動テスト → 承認 → 展開</strong>{' '}の流れに乗せられます。{' '}</p>{' '}<Diagram id="dg25" />{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">メリット</th><th scope="col">説明</th></tr></thead><tbody><tr><td>変更の追跡</td><td>誰が・いつ・何を変えたかが履歴に残る</td></tr><tr><td>品質向上</td><td>人為ミスを機械チェックで防ぐ</td></tr><tr><td>速度</td><td>手作業より速く安全に展開</td></tr><tr><td>ロールバック</td><td>過去の版へ戻しやすい</td></tr></tbody></table>{' '}</div>{' '}<h2>5.5 Infrastructure as Code（IaC）</h2>{' '}<p>{' '}<strong>インフラの構成をコード（宣言的なファイル）として記述し、バージョン管理・自動適用する</strong>考え方です。{' '}</p>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">原則</th><th scope="col">説明</th></tr></thead><tbody><tr><td>宣言的</td><td>「あるべき状態」を記述し、ツールが差分を埋める</td></tr><tr><td>冪等性</td><td>何度実行しても同じ結果になる</td></tr><tr><td>バージョン管理</td><td>Git で履歴・レビュー</td></tr><tr><td>再現性</td><td>同じコードから同じ環境を作れる</td></tr><tr><td>不変インフラの考え方</td><td>{' '}手動変更（構成ドリフト）を避け、コードを変更して再適用する{' '}</td></tr></tbody></table>{' '}</div>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">比較</th><th scope="col">宣言型（Declarative）</th><th scope="col">手続き型（Imperative）</th></tr></thead><tbody><tr><td>記述するもの</td><td>最終的な状態</td><td>実行する手順</td></tr><tr><td>例</td><td>Terraform、Ansible の多くのモジュール</td><td>シェルスクリプト、Python スクリプト</td></tr></tbody></table>{' '}</div>{' '}<h2>5.6 自動化ツール：Ansible・Terraform・NSO</h2>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">観点</th><th scope="col">Ansible</th><th scope="col">Terraform</th><th scope="col">Cisco NSO</th></tr></thead><tbody><tr><td>主な用途</td><td>構成管理、運用タスクの自動化</td><td>インフラのプロビジョニング（作成・変更・削除）</td><td>{' '}マルチベンダーのネットワークサービスのオーケストレーション{' '}</td></tr><tr><td>記述形式</td><td><strong>YAML</strong>（Playbook）</td><td><strong>HCL</strong>（<code>.tf</code>）</td><td>YANG モデル＋サービスパッケージ</td></tr><tr><td>方式</td><td><strong>エージェントレス</strong>（SSH／API で接続）</td><td>プロバイダー経由で API を呼び出し</td><td>NED 経由で機器を操作</td></tr><tr><td>状態管理</td><td>基本は持たない（都度、現状を確認）</td><td><strong>ステートファイル</strong>で管理</td><td>CDB（構成データベース）</td></tr><tr><td>冪等性</td><td>モジュールにより担保</td><td>宣言的に担保</td><td>トランザクション</td></tr></tbody></table>{' '}</div>{' '}<p>{' '}補足：Puppet／Chef は v1.1 の Associate
                        範囲では明示されなくなったと説明されていますが、<strong>構成管理ツールの考え方</strong>を知る参考にはなります。{' '}</p>{' '}<h3>Ansible の基本用語</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">用語</th><th scope="col">意味</th></tr></thead><tbody><tr><td>Inventory</td><td>管理対象ホストの一覧（グループ化可能）</td></tr><tr><td>Playbook</td><td>自動化手順を YAML で書いたファイル</td></tr><tr><td>Play</td><td>「どのホストに何をするか」の単位</td></tr><tr><td>Task</td><td>1 つの処理（モジュール呼び出し）</td></tr><tr><td>Module</td><td>{' '}実処理の部品（<code>package</code>、<code>service</code>、<code>user</code>、<code>template</code>{' '}など）{' '}</td></tr><tr><td>Handler</td><td>{' '}変更があったときだけ実行される処理（サービス再起動など）{' '}</td></tr><tr><td>Role</td><td>再利用可能な Playbook のまとまり</td></tr></tbody></table>{' '}</div>{' '}<h3>Playbook の例（パッケージ、サービス、ユーザー）</h3>{' '}<CodeBlock
    lang="yaml"
    lines={[
        "---",
        "- name: Web サーバーを構成する",
        "  hosts: webservers",
        "  become: true",
        "  tasks:",
        "    - name: nginx をインストールする",
        "      ansible.builtin.package:",
        "        name: nginx",
        "        state: present",
        "",
        "    - name: 運用用ユーザーを作成する",
        "      ansible.builtin.user:",
        "        name: opsuser",
        "        state: present",
        "        shell: /bin/bash",
        "",
        "    - name: 設定ファイルを配置する",
        "      ansible.builtin.template:",
        "        src: nginx.conf.j2",
        "        dest: /etc/nginx/nginx.conf",
        "      notify: restart nginx",
        "",
        "    - name: nginx を起動し自動起動を有効にする",
        "      ansible.builtin.service:",
        "        name: nginx",
        "        state: started",
        "        enabled: true",
        "",
        "  handlers:",
        "    - name: restart nginx",
        "      ansible.builtin.service:",
        "        name: nginx",
        "        state: restarted",
    ]}
/>{' '}<h3>このワークフローを読み解く</h3>{' '}<ol>{' '}<li>{' '}<code>webservers</code>{' '}グループのホストへ、特権昇格（<code>become</code>）して実行する。{' '}</li>{' '}<li>nginx を導入し、ユーザー{' '}<code>opsuser</code>{' '}を作成する。</li>{' '}<li>{' '}テンプレートから設定ファイルを配置し、<strong>変更があれば</strong>ハンドラーで再起動する。{' '}</li>{' '}<li>サービスを起動し、自動起動を有効にする。</li>{' '}</ol>{' '}<p>{' '}実行：<code>ansible-playbook -i inventory.ini site.yml</code>（<code>--check</code>{' '}でドライラン）{' '}</p>{' '}<h3>Terraform の基本</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">コマンド</th><th scope="col">内容</th></tr></thead><tbody><tr><td><code>terraform init</code></td><td>プロバイダーの取得など初期化</td></tr><tr><td><code>terraform plan</code></td><td>適用前に<strong>変更内容を確認</strong>（ドライラン）</td></tr><tr><td><code>terraform apply</code></td><td>変更を適用</td></tr><tr><td><code>terraform destroy</code></td><td>管理下のリソースを削除</td></tr></tbody></table>{' '}</div>{' '}<CodeBlock
    lang="hcl"
    lines={[
        "terraform {",
        "  required_providers {",
        "    aci = {",
        "      source = \"CiscoDevNet/aci\"",
        "    }",
        "  }",
        "}",
        "",
        "variable \"apic_password\" {",
        "  type      = string",
        "  sensitive = true",
        "}",
        "",
        "provider \"aci\" {",
        "  username = \"admin\"",
        "  password = var.apic_password",
        "  url      = \"https://apic.example.com\"",
        "}",
        "",
        "resource \"aci_tenant\" \"demo\" {",
        "  name = \"demo-tenant\"",
        "}",
    ]}
/>{' '}<Diagram id="dg26" />{' '}<div className="callout practice">{' '}<h3 className="callout-title"><i className="ti ti-bulb"></i>ベストプラクティス</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">{' '}ツール{' '}</th><th scope="col">{' '}推奨{' '}</th></tr></thead><tbody><tr><td>{' '}Ansible{' '}</td><td>{' '}Ansible Vault で秘密情報を暗号化。まず{' '}<code>--check</code>（ドライラン）。ハンドラーで不要な再起動を避ける{' '}</td></tr><tr><td>{' '}Terraform{' '}</td><td>{' '}<strong>apply 前に必ず plan をレビュー</strong>。ステートは共有ストレージで管理しロックする。秘密情報を{' '}<code>.tf</code>{' '}に直書きしない{' '}</td></tr><tr><td>{' '}共通{' '}</td><td>{' '}Git 管理、コードレビュー、検証環境で先にテスト、最小権限のアカウント{' '}</td></tr></tbody></table>{' '}</div>{' '}</div>{' '}<h2>5.7 Python スクリプトが何を自動化しているかを読み取る</h2>{' '}<p>{' '}試験では、Cisco API を使う Python
                        コードを提示し、「どの作業を自動化しているか」を問われます。{' '}</p>{' '}<CodeBlock
    lang="python"
    lines={[
        "import requests",
        "",
        "url = \"https://sandbox-apic.example.com/api/aaaLogin.json\"",
        "body = {\"aaaUser\": {\"attributes\": {\"name\": \"admin\", \"pwd\": \"secret\"}}}",
        "s = requests.Session()",
        "s.post(url, json=body, verify=False)                                   # (1) ログイン",
        "",
        "r = s.get(\"https://sandbox-apic.example.com/api/class/fabricNode.json\")  # (2) ファブリックノード取得",
        "for item in r.json()[\"imdata\"]:",
        "    print(item[\"fabricNode\"][\"attributes\"][\"name\"])                      # (3) 名前を表示",
    ]}
/>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">手がかり</th><th scope="col">読み取り</th></tr></thead><tbody><tr><td><code>aaaLogin.json</code></td><td>ACI（APIC）への<strong>認証</strong></td></tr><tr><td><code>class/fabricNode.json</code></td><td>{' '}ACI ファブリックの<strong>ノード（機器）一覧の取得</strong>{' '}</td></tr><tr><td><code>imdata</code></td><td>APIC レスポンスの共通キー</td></tr></tbody></table>{' '}</div>{' '}<div className="callout note">{' '}<h3 className="callout-title"><i className="ti ti-info-circle"></i>補足</h3>{' '}<p>{' '}この例の{' '}<code>verify=False</code>{' '}は、証明書検証を無効にするため<strong>検証環境限定</strong>です。本番では使いません（試験ではセキュリティ上の問題点として問われることもあります）。{' '}</p>{' '}</div>{' '}<h3>手がかりの早見表</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">キーワード</th><th scope="col">プラットフォームとおそらくの処理</th></tr></thead><tbody><tr><td>{' '}<code>X-Cisco-Meraki-API-Key</code>、<code>/organizations</code>、<code>/devices</code>{' '}</td><td>Meraki の組織／デバイス取得</td></tr><tr><td>{' '}<code>/dna/system/api/v1/auth/token</code>、<code>X-Auth-Token</code>{' '}</td><td>Catalyst Center の認証</td></tr><tr><td><code>/dna/intent/api/v1/network-device</code></td><td>Catalyst Center のデバイス一覧</td></tr><tr><td><code>/restconf/data/...</code></td><td>RESTCONF によるデバイスの設定／状態の取得・変更</td></tr><tr><td><code>webexapis.com/v1/messages</code></td><td>Webex へのメッセージ投稿</td></tr><tr><td><code>/api/aaaLogin.json</code>、<code>imdata</code></td><td>ACI（APIC）</td></tr></tbody></table>{' '}</div>{' '}<h2>5.8 Bash スクリプトが何を自動化しているかを読み取る</h2>{' '}<CodeBlock
    lang="bash"
    lines={[
        "#!/bin/bash",
        "BACKUP_DIR=\"/backup/$(date +%Y%m%d)\"",
        "mkdir -p \"$BACKUP_DIR\"",
        "cp /etc/nginx/nginx.conf \"$BACKUP_DIR/\"",
        "sudo apt-get install -y nginx",
        "sudo useradd -m opsuser",
        "cd /var/www/html",
        "ls -l",
    ]}
/>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">行</th><th scope="col">何をしているか</th></tr></thead><tbody><tr><td><code>mkdir -p</code>{' '}と{' '}<code>cp</code></td><td>{' '}日付付きバックアップディレクトリを作り設定ファイルを保存（<strong>ファイル管理</strong>）{' '}</td></tr><tr><td><code>apt-get install</code></td><td>パッケージのインストール（<strong>アプリ導入</strong>）</td></tr><tr><td><code>useradd</code></td><td>ユーザー作成（<strong>ユーザー管理</strong>）</td></tr><tr><td><code>cd</code>、<code>ls</code></td><td>{' '}ディレクトリ移動と一覧（<strong>ナビゲーション</strong>）{' '}</td></tr></tbody></table>{' '}</div>{' '}<h2>5.9 RESTCONF／NETCONF の結果を読み取る</h2>{' '}<h3>RESTCONF の応答（JSON）</h3>{' '}<CodeBlock
    lang="json"
    lines={[
        "{",
        "  \"ietf-interfaces:interface\": {",
        "    \"name\": \"GigabitEthernet1\",",
        "    \"description\": \"uplink to core\",",
        "    \"type\": \"iana-if-type:ethernetCsmacd\",",
        "    \"enabled\": true,",
        "    \"ietf-ip:ipv4\": {",
        "      \"address\": [",
        "        { \"ip\": \"192.0.2.1\", \"netmask\": \"255.255.255.0\" }",
        "      ]",
        "    }",
        "  }",
        "}",
    ]}
/>{' '}<p>{' '}<strong>読み取り</strong>：インターフェース{' '}<code>GigabitEthernet1</code>{' '}は有効（<code>enabled: true</code>）で、説明は「uplink to core」、IPv4 アドレスは 192.0.2.1/24。トップのキー{' '}<code>ietf-interfaces:interface</code>{' '}は「<strong>モジュール名:ノード名</strong>」の形式で、YANG
                        モデルの名前空間を示します。{' '}</p>{' '}<h3>NETCONF のリクエストと応答（XML）</h3>{' '}<CodeBlock
    lang="xml"
    lines={[
        "<rpc message-id=\"101\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">",
        "  <get-config>",
        "    <source><running/></source>",
        "    <filter type=\"subtree\">",
        "      <interfaces xmlns=\"urn:ietf:params:xml:ns:yang:ietf-interfaces\"/>",
        "    </filter>",
        "  </get-config>",
        "</rpc>",
    ]}
/>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">要素</th><th scope="col">意味</th></tr></thead><tbody><tr><td><code>&lt;rpc message-id&gt;</code></td><td>要求。応答には同じ{' '}<code>message-id</code>{' '}が付く</td></tr><tr><td><code>&lt;get-config&gt;</code></td><td>設定データの取得</td></tr><tr><td><code>&lt;source&gt;&lt;running/&gt;</code></td><td>取得元は running-config</td></tr><tr><td><code>&lt;filter&gt;</code></td><td>{' '}取得対象を絞り込み（対象は{' '}<code>ietf-interfaces</code>）{' '}</td></tr></tbody></table>{' '}</div>{' '}<p>{' '}応答は{' '}<code>&lt;rpc-reply&gt;</code>{' '}で返り、成功時は{' '}<code>&lt;data&gt;</code>{' '}の中に結果、失敗時は{' '}<code>&lt;rpc-error&gt;</code>{' '}が入ります。{' '}</p>{' '}<h2>5.10 基本的な YANG モデルの読み方</h2>{' '}<CodeBlock
    lang="yang"
    lines={[
        "module example-interfaces {",
        "  namespace \"http://example.com/interfaces\";",
        "  prefix exif;",
        "",
        "  container interfaces {",
        "    list interface {",
        "      key \"name\";",
        "",
        "      leaf name {",
        "        type string;",
        "      }",
        "      leaf description {",
        "        type string;",
        "      }",
        "      leaf enabled {",
        "        type boolean;",
        "        default true;",
        "      }",
        "      leaf mtu {",
        "        type uint16 {",
        "          range \"68..9000\";",
        "        }",
        "      }",
        "    }",
        "  }",
        "}",
    ]}
/>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">要素</th><th scope="col">意味</th><th scope="col">この例</th></tr></thead><tbody><tr><td><code>module</code></td><td>モデルの最上位単位</td><td><code>example-interfaces</code></td></tr><tr><td><code>container</code></td><td>子ノードをまとめる入れ物</td><td><code>interfaces</code></td></tr><tr><td><code>list</code></td><td>{' '}同種のエントリの<strong>繰り返し</strong>。<code>key</code>{' '}で一意に識別{' '}</td><td><code>interface</code>（キーは{' '}<code>name</code>）</td></tr><tr><td><code>leaf</code></td><td>1 つの値（データの末端）</td><td>{' '}<code>name</code>、<code>description</code>、<code>enabled</code>、<code>mtu</code>{' '}</td></tr><tr><td><code>leaf-list</code></td><td>値の配列</td><td>（この例では未使用）</td></tr><tr><td><code>type</code></td><td>データ型と制約</td><td><code>mtu</code>{' '}は 68 から 9000 の整数</td></tr><tr><td><code>default</code></td><td>既定値</td><td><code>enabled</code>{' '}は既定で true</td></tr></tbody></table>{' '}</div>{' '}<h3>YANG と JSON の対応</h3>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">YANG の構造</th><th scope="col">JSON での表現</th></tr></thead><tbody><tr><td>container</td><td>オブジェクト{' '}<code>&#123;&#125;</code></td></tr><tr><td>list</td><td>配列{' '}<code>[]</code>（各要素はオブジェクト）</td></tr><tr><td>leaf</td><td>キーと値</td></tr></tbody></table>{' '}</div>{' '}<h2>5.11 Unified Diff（統一差分）の読み方</h2>{' '}<CodeBlock
    lang="diff"
    lines={[
        "--- a/switch.yaml",
        "+++ b/switch.yaml",
        "@@ -1,4 +1,4 @@",
        " hostname: sw01",
        "-mtu: 1500",
        "+mtu: 9000",
        " vlan: 10",
        " description: access",
    ]}
/>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">記号</th><th scope="col">意味</th></tr></thead><tbody><tr><td><code>---</code></td><td>変更前のファイル</td></tr><tr><td><code>+++</code></td><td>変更後のファイル</td></tr><tr><td><code>@@ -1,4 +1,4 @@</code></td><td>{' '}ハンク（変更範囲）。変更前は 1 行目から 4 行、変更後も 1
                                        行目から 4 行{' '}</td></tr><tr><td>先頭{' '}<code>-</code></td><td><strong>削除</strong>された行（赤）</td></tr><tr><td>先頭{' '}<code>+</code></td><td><strong>追加</strong>された行（緑）</td></tr><tr><td>先頭スペース</td><td>変更なしの行（文脈）</td></tr></tbody></table>{' '}</div>{' '}<p>{' '}<strong>読み取り</strong>：<code>mtu</code>{' '}が 1500 から 9000
                        に変更された差分。他の行は変更なし。{' '}</p>{' '}<h2>5.12 コードレビュー</h2>{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">観点</th><th scope="col">説明</th></tr></thead><tbody><tr><td>目的</td><td>{' '}不具合・セキュリティ問題の早期発見、品質と可読性の向上、知識の共有{' '}</td></tr><tr><td>進め方</td><td>{' '}Pull Request で差分を提示 → レビュアーがコメント → 修正 →
                                        承認 → マージ{' '}</td></tr><tr><td>見る点</td><td>{' '}正しさ、テストの有無、命名、重複、エラー処理、<strong>秘密情報の混入</strong>、パフォーマンス、可読性{' '}</td></tr></tbody></table>{' '}</div>{' '}<div className="callout practice">{' '}<h3 className="callout-title">{' '}<i className="ti ti-bulb"></i>レビューのベストプラクティス{' '}</h3>{' '}<ul>{' '}<li>{' '}変更を<strong>小さく</strong>保つ（大きすぎる PR
                                は見落としが増える）。{' '}</li>{' '}<li>{' '}人格ではなく<strong>コードに対して</strong>建設的にコメントする。{' '}</li>{' '}<li>{' '}lint・テストなど機械的にできる確認は CI
                                に任せ、人は設計や意図を見る。{' '}</li>{' '}<li>{' '}自動化スクリプトの変更は、<strong>影響範囲（どの機器に適用されるか）</strong>を必ず確認する。{' '}</li>{' '}</ul>{' '}</div>{' '}<h2>5.13 シーケンス図の読み方（API 呼び出し）</h2>{' '}<p>{' '}シーケンス図は、<strong>登場者（縦の線）の間で、時間順（上から下）にやり取り</strong>を表します。{' '}</p>{' '}<Diagram id="dg27" />{' '}<div className="table-wrap">{' '}<table><thead><tr><th scope="col">記号</th><th scope="col">意味</th></tr></thead><tbody><tr><td>実線の矢印</td><td>リクエスト（呼び出し）</td></tr><tr><td>破線の矢印</td><td>レスポンス（戻り）</td></tr><tr><td>縦の線（ライフライン）</td><td>各参加者の時間軸（上から下へ進む）</td></tr><tr><td><code>loop</code>、<code>alt</code></td><td>繰り返し、条件分岐</td></tr></tbody></table>{' '}</div>{' '}<p>{' '}<strong>読み方のコツ</strong>：①誰が誰に、②どの順で、③どんな認証・データが渡るか、を順に追う。{' '}</p>{' '}<h3>確認問題（第 5 章）</h3>{' '}<ol>{' '}<li>Ansible が「エージェントレス」とはどういう意味か。</li>{' '}<li>Terraform で、適用前に変更内容を確認するコマンドは何か。</li>{' '}<li>YANG で「同種の複数エントリの繰り返し」を表す要素は何か。</li>{' '}<li>Unified diff で、行頭が{' '}<code>+</code>{' '}の行は何を意味するか。</li>{' '}</ol>{' '}<div className="callout source">{' '}<h3 className="callout-title">{' '}<i className="ti ti-external-link"></i>第 5 章の参考ソース{' '}</h3>{' '}<div className="refs">{' '}<div className="ref">{' '}<span className="badge">1</span>{' '}<div className="ref-body">{' '}<div className="ref-title">Cisco Exam Topics（200-901）</div>{' '}<a href="https://www.cisco.com/c/dam/en_us/training-events/le31/le46/cln/marketing/exam-topics/200-901-DEVASC.pdf" rel="noopener noreferrer" target="_blank">https://www.cisco.com/c/dam/en_us/training-events/le31/le46/cln/marketing/exam-topics/200-901-DEVASC.pdf</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">2</span>{' '}<div className="ref-body">{' '}<div className="ref-title">Ansible ドキュメント</div>{' '}<a href="https://docs.ansible.com/" rel="noopener noreferrer" target="_blank">https://docs.ansible.com/</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">3</span>{' '}<div className="ref-body">{' '}<div className="ref-title">Terraform ドキュメント</div>{' '}<a href="https://developer.hashicorp.com/terraform/docs" rel="noopener noreferrer" target="_blank">https://developer.hashicorp.com/terraform/docs</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">4</span>{' '}<div className="ref-body">{' '}<div className="ref-title">{' '}Terraform Registry（ACI プロバイダー）{' '}</div>{' '}<a href="https://registry.terraform.io/providers/CiscoDevNet/aci/latest" rel="noopener noreferrer" target="_blank">https://registry.terraform.io/providers/CiscoDevNet/aci/latest</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">5</span>{' '}<div className="ref-body">{' '}<div className="ref-title">Cisco Modeling Labs</div>{' '}<a href="https://www.cisco.com/site/us/en/learn/training-certifications/training/modeling-labs/index.html" rel="noopener noreferrer" target="_blank">https://www.cisco.com/site/us/en/learn/training-certifications/training/modeling-labs/index.html</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">6</span>{' '}<div className="ref-body">{' '}<div className="ref-title">pyATS</div>{' '}<a href="https://developer.cisco.com/pyats/" rel="noopener noreferrer" target="_blank">https://developer.cisco.com/pyats/</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">7</span>{' '}<div className="ref-body">{' '}<div className="ref-title">YANG Catalog</div>{' '}<a href="https://www.yangcatalog.org/" rel="noopener noreferrer" target="_blank">https://www.yangcatalog.org/</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">8</span>{' '}<div className="ref-body">{' '}<div className="ref-title">NETCONF（RFC 6241）</div>{' '}<a href="https://www.rfc-editor.org/rfc/rfc6241" rel="noopener noreferrer" target="_blank">https://www.rfc-editor.org/rfc/rfc6241</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">9</span>{' '}<div className="ref-body">{' '}<div className="ref-title">RESTCONF（RFC 8040）</div>{' '}<a href="https://www.rfc-editor.org/rfc/rfc8040" rel="noopener noreferrer" target="_blank">https://www.rfc-editor.org/rfc/rfc8040</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">10</span>{' '}<div className="ref-body">{' '}<div className="ref-title">YANG 1.1（RFC 7950）</div>{' '}<a href="https://www.rfc-editor.org/rfc/rfc7950" rel="noopener noreferrer" target="_blank">https://www.rfc-editor.org/rfc/rfc7950</a>{' '}</div>{' '}</div>{' '}<div className="ref">{' '}<span className="badge">11</span>{' '}<div className="ref-body">{' '}<div className="ref-title">Unified diff（GNU diffutils）</div>{' '}<a href="https://www.gnu.org/software/diffutils/manual/html_node/Unified-Format.html" rel="noopener noreferrer" target="_blank">https://www.gnu.org/software/diffutils/manual/html_node/Unified-Format.html</a>{' '}</div>{' '}</div>{' '}</div>{' '}</div>{' '}</div>{' '}</section>
        </>
    );
}
