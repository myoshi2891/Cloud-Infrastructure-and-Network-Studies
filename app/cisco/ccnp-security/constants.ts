// CCNP Security 学習ガイド定数定義

export interface NavItem {
    href: string;
    title: string;
    subItems?: Array<{ href: string; title: string }>;
}

export interface NavGroup {
    title: string;
    href?: string;
    items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
    {
        "title": "はじめに",
        "items": [
            {
                "href": "#s1",
                "title": "0. このガイドの読み方",
                "subItems": [
                    {
                        "href": "#t1",
                        "title": "0.1 各トピックの書き方"
                    },
                    {
                        "href": "#t2",
                        "title": "0.2 根拠ラベル"
                    },
                    {
                        "href": "#t3",
                        "title": "0.3 注意事項"
                    }
                ]
            },
            {
                "href": "#s2",
                "title": "1. 【最重要】公式日本語ページと最新状況の差分"
            },
            {
                "href": "#s3",
                "title": "2. 認定の全体像",
                "subItems": [
                    {
                        "href": "#t4",
                        "title": "2.1 取得要件"
                    },
                    {
                        "href": "#t5",
                        "title": "2.2 試験一覧（現行）"
                    },
                    {
                        "href": "#t6",
                        "title": "2.3 どのコンセントレーションを選ぶ？"
                    },
                    {
                        "href": "#t7",
                        "title": "2.4 有効期間・3 年ルール・再認定"
                    },
                    {
                        "href": "#t8",
                        "title": "2.5 学習ロードマップ（全体）"
                    }
                ]
            },
            {
                "href": "#s4",
                "title": "3. 前提知識（初学者のための基礎）",
                "subItems": [
                    {
                        "href": "#t9",
                        "title": "3.1 セキュリティの 3 要素（CIA）"
                    },
                    {
                        "href": "#t10",
                        "title": "3.2 AAA（認証・認可・アカウンティング）"
                    },
                    {
                        "href": "#t11",
                        "title": "3.3 暗号の基礎"
                    },
                    {
                        "href": "#t12",
                        "title": "3.4 試験で出やすいポート／プロトコル"
                    },
                    {
                        "href": "#t13",
                        "title": "3.5 ゼロトラストと多層防御（先取り）"
                    }
                ]
            }
        ]
    },
    {
        "title": "Part A: コア試験 350-701 SCOR v2.0",
        "href": "#p1",
        "items": [
            {
                "href": "#s5",
                "title": "A-1. ドメイン 1.0 Security Concepts（20%）",
                "subItems": [
                    {
                        "href": "#t14",
                        "title": "1.1 オンプレミス・ハイブリッド・クラウド環境への攻撃脅威"
                    },
                    {
                        "href": "#t15",
                        "title": "1.2 脆弱性とエクスプロイト（OWASP Top 10、CVE、CVSS）"
                    },
                    {
                        "href": "#t16",
                        "title": "1.3 AI／LLM モデルの脆弱性（新規）"
                    },
                    {
                        "href": "#t17",
                        "title": "1.4 フィッシング・ソーシャルエンジニアリング対策"
                    },
                    {
                        "href": "#t18",
                        "title": "1.5 暗号コンポーネント（ハッシュ、暗号化、PKI、TLS、QUIC、MASQUE、IPsec、PQC）"
                    },
                    {
                        "href": "#t19",
                        "title": "1.6 サイト間／リモートアクセス VPN の方式"
                    },
                    {
                        "href": "#t20",
                        "title": "1.7 セキュリティインテリジェンスの作成・共有・消費"
                    },
                    {
                        "href": "#t21",
                        "title": "1.8 ゼロトラストアーキテクチャ"
                    },
                    {
                        "href": "#t22",
                        "title": "1.9 多層防御と Cisco SAFE"
                    },
                    {
                        "href": "#t23",
                        "title": "1.10 セキュリティ機器 API を呼び出すスクリプトの読解（Python）"
                    }
                ]
            },
            {
                "href": "#s6",
                "title": "A-2. ドメイン 2.0 Network Security（25%）",
                "subItems": [
                    {
                        "href": "#t24",
                        "title": "2.1 FW／IPS の導入形態（デプロイメントモデル）"
                    },
                    {
                        "href": "#t25",
                        "title": "2.2 セキュリティ監視とテレメトリ技術"
                    },
                    {
                        "href": "#t26",
                        "title": "2.3 ネットワークインフラのセキュリティ（VLAN／SGT、L2 防御）"
                    },
                    {
                        "href": "#t27",
                        "title": "2.4 ネットワークセキュリティ製品の管理方式の選択"
                    },
                    {
                        "href": "#t28",
                        "title": "2.5 CIS ベンチマークによる機器のハードニング"
                    },
                    {
                        "href": "#t29",
                        "title": "2.6 AAA（TACACS+／RADIUS）のトラブルシューティング"
                    },
                    {
                        "href": "#t30",
                        "title": "2.7 セキュアなネットワーク管理（SNMPv3、NETCONF、RESTCONF、API、セキュア syslog、NTP 認証）"
                    },
                    {
                        "href": "#t31",
                        "title": "2.8 FTD のアクセスコントロール、AVC、URL フィルタ、マルウェア防御、IPS"
                    },
                    {
                        "href": "#t32",
                        "title": "2.9 FTD と Cisco Secure Client によるサイト間／リモートアクセス VPN の構成"
                    },
                    {
                        "href": "#t33",
                        "title": "2.10 FTD の VPN トンネル確立のトラブルシューティング"
                    }
                ]
            },
            {
                "href": "#s7",
                "title": "A-3. ドメイン 3.0 Cloud Security（15%）",
                "subItems": [
                    {
                        "href": "#t34",
                        "title": "3.1 クラウドの責任共有モデル"
                    },
                    {
                        "href": "#t35",
                        "title": "3.2 クラウドセキュリティの機能・展開モデル・フレームワーク・ポリシー管理"
                    },
                    {
                        "href": "#t36",
                        "title": "3.3 クラウド環境のセキュリティソリューション選定（NIST SP 800-145、CASB）"
                    },
                    {
                        "href": "#t37",
                        "title": "3.4 クラウドのネットワーク・アプリ・データ保護（Multicloud Defense、Secure Workload）"
                    },
                    {
                        "href": "#t38",
                        "title": "3.5 Splunk によるクラウドログの取り込み"
                    },
                    {
                        "href": "#t39",
                        "title": "3.6 アプリケーションとワークロードのセキュリティ（eBPF を含む）"
                    },
                    {
                        "href": "#t40",
                        "title": "3.7 DevSecOps（IaC セキュリティ、CI/CD、コンテナオーケストレーション、安全な開発）"
                    }
                ]
            },
            {
                "href": "#s8",
                "title": "A-4. ドメイン 4.0 Secure Service Edge（10%）",
                "subItems": [
                    {
                        "href": "#t41",
                        "title": "4.1 SSE と SASE"
                    },
                    {
                        "href": "#t42",
                        "title": "4.2 Cisco Secure Access：Secure Internet Access の構成"
                    },
                    {
                        "href": "#t43",
                        "title": "4.3 Cisco Secure Access：Secure Private Access の構成"
                    },
                    {
                        "href": "#t44",
                        "title": "4.4 データ損失防止（DLP）と AI ガードレールの設定"
                    },
                    {
                        "href": "#t45",
                        "title": "4.5 Secure Access Investigate のスコアと指標の読み方"
                    }
                ]
            },
            {
                "href": "#s9",
                "title": "A-5. ドメイン 5.0 Endpoint Protection and Detection（15%）",
                "subItems": [
                    {
                        "href": "#t46",
                        "title": "5.1 EPP と EDR の違い"
                    },
                    {
                        "href": "#t47",
                        "title": "5.2 モバイルデバイス管理（MDM）と資産インベントリ"
                    },
                    {
                        "href": "#t48",
                        "title": "5.3 ポスチャ評価と端末コンプライアンス"
                    },
                    {
                        "href": "#t49",
                        "title": "5.4 Cisco Secure Client と Secure Malware Analytics"
                    },
                    {
                        "href": "#t50",
                        "title": "5.5 Cisco Secure Endpoint のアンチマルウェア保護の設定"
                    },
                    {
                        "href": "#t51",
                        "title": "5.6 Secure Endpoint のマルウェアイベントの解釈"
                    },
                    {
                        "href": "#t52",
                        "title": "5.7 Cisco Secure Email Threat Defense によるメール脅威対策"
                    }
                ]
            },
            {
                "href": "#s10",
                "title": "A-6. ドメイン 6.0 Network Access, Visibility, and Enforcement（15%）",
                "subItems": [
                    {
                        "href": "#t53",
                        "title": "6.1 アイデンティティ管理とセキュアなネットワークアクセスの概念"
                    },
                    {
                        "href": "#t54",
                        "title": "6.2 端末コンプライアンスとアプリケーション制御"
                    },
                    {
                        "href": "#t55",
                        "title": "6.3 802.1X と MAB（ISE）"
                    },
                    {
                        "href": "#t56",
                        "title": "6.4 CoA（Change of Authorization）"
                    },
                    {
                        "href": "#t57",
                        "title": "6.5 データ持ち出し（エクスフィルトレーション）手法"
                    },
                    {
                        "href": "#t58",
                        "title": "6.6 テレメトリ・AI/ML・XDR／SIEM／SOAR による可視化と強制"
                    },
                    {
                        "href": "#t59",
                        "title": "6.7 ゼロトラストにおける Duo（Trust Monitor、MFA、Device Trust、適応型アクセス）"
                    },
                    {
                        "href": "#t60",
                        "title": "6.8 Splunk によるセキュリティ情報・イベントの管理・オーケストレーション・自動化"
                    }
                ]
            }
        ]
    },
    {
        "title": "Part B: 300-710 SNCF v1.2（Securing Networks with Cisco Firewalls）",
        "href": "#p2",
        "items": [
            {
                "href": "#s11",
                "title": "B-1. ドメイン 1.0 Deployment（30%）",
                "subItems": [
                    {
                        "href": "#t61",
                        "title": "1.1 ルーテッド／トランスペアレント配置"
                    },
                    {
                        "href": "#t62",
                        "title": "1.2 NGIPS のパッシブ／インライン配置"
                    },
                    {
                        "href": "#t63",
                        "title": "1.3 高可用性（HA）とスケーリング"
                    },
                    {
                        "href": "#t64",
                        "title": "1.4 仮想アプライアンスとクラウド上の管理"
                    }
                ]
            },
            {
                "href": "#s12",
                "title": "B-2. ドメイン 2.0 Configuration（30%）",
                "subItems": [
                    {
                        "href": "#t65",
                        "title": "2.1 FMC のシステム設定"
                    },
                    {
                        "href": "#t66",
                        "title": "2.2 各種ポリシー"
                    },
                    {
                        "href": "#t67",
                        "title": "2.3 ネットワーク検出・相関・EVE"
                    },
                    {
                        "href": "#t68",
                        "title": "2.4 オブジェクトと侵入防御ルール"
                    },
                    {
                        "href": "#t69",
                        "title": "2.5 デバイス管理：証明書、プラットフォーム設定、NAT、ルーティング、ネットワーク設定、セキュアアクセス"
                    },
                    {
                        "href": "#t70",
                        "title": "2.6 FTD のトラフィック処理の全体像（学習の要）"
                    }
                ]
            },
            {
                "href": "#s13",
                "title": "B-3. ドメイン 3.0 Management and Troubleshooting（25%）",
                "subItems": [
                    {
                        "href": "#t71",
                        "title": "3.1 FMC と FTD CLI によるトラブルシューティング"
                    },
                    {
                        "href": "#t72",
                        "title": "3.2 ダッシュボードとレポート"
                    },
                    {
                        "href": "#t73",
                        "title": "3.3 トラブルシュートツール"
                    },
                    {
                        "href": "#t74",
                        "title": "3.4 イベントとネットワークマップ"
                    },
                    {
                        "href": "#t75",
                        "title": "3.5 管理ツールの選択"
                    }
                ]
            },
            {
                "href": "#s14",
                "title": "B-4. ドメイン 4.0 Integration（15%）",
                "subItems": [
                    {
                        "href": "#t76",
                        "title": "4.1 マルウェア防御（Malware Defense）"
                    },
                    {
                        "href": "#t77",
                        "title": "4.2 Secure Endpoint 連携"
                    },
                    {
                        "href": "#t78",
                        "title": "4.3 Threat Intelligence Director（TID）"
                    },
                    {
                        "href": "#t79",
                        "title": "4.4 Cisco XDR 連携"
                    },
                    {
                        "href": "#t80",
                        "title": "4.5 pxGrid と ISE"
                    },
                    {
                        "href": "#t81",
                        "title": "4.6 Rapid Threat Containment（RTC）"
                    },
                    {
                        "href": "#t82",
                        "title": "4.7 Security Analytics and Logging（SAL）"
                    },
                    {
                        "href": "#t83",
                        "title": "4.8 Splunk 連携"
                    }
                ]
            }
        ]
    },
    {
        "title": "Part C: 300-715 SISE v1.2（Implementing and Configuring Cisco Identity Services Engine）",
        "href": "#p3",
        "items": [
            {
                "href": "#s15",
                "title": "C-1. ドメイン 1.0 Architecture and Deployment（10%）",
                "subItems": [
                    {
                        "href": "#t84",
                        "title": "1.1 ペルソナ（ノードの役割）"
                    },
                    {
                        "href": "#t85",
                        "title": "1.2 展開形態と設計"
                    }
                ]
            },
            {
                "href": "#s16",
                "title": "C-2. ドメイン 2.0 Policy Enforcement（25%）",
                "subItems": [
                    {
                        "href": "#t86",
                        "title": "2.1 AD と LDAP の連携"
                    },
                    {
                        "href": "#t87",
                        "title": "2.2 ID ストアの選択肢とシーケンス"
                    },
                    {
                        "href": "#t88",
                        "title": "2.3 無線 LAN の 802.1X"
                    },
                    {
                        "href": "#t89",
                        "title": "2.4 有線 802.1X（IBNS 2.0）とホストモード"
                    },
                    {
                        "href": "#t90",
                        "title": "2.5 MAB"
                    },
                    {
                        "href": "#t91",
                        "title": "2.6 TrustSec（SGT）"
                    },
                    {
                        "href": "#t92",
                        "title": "2.7 認証・認可ポリシーとプロファイル"
                    }
                ]
            },
            {
                "href": "#s17",
                "title": "C-3. ドメイン 3.0 Web Auth and Guest Services（15%）",
                "subItems": [
                    {
                        "href": "#t93",
                        "title": "3.1 Web 認証の方式"
                    },
                    {
                        "href": "#t94",
                        "title": "3.2 ゲストアクセスのタイプ"
                    },
                    {
                        "href": "#t95",
                        "title": "3.3 ポータルの設定"
                    }
                ]
            },
            {
                "href": "#s18",
                "title": "C-4. ドメイン 4.0 Profiler（15%）",
                "subItems": [
                    {
                        "href": "#t96",
                        "title": "4.1 プローブ（情報の収集手段）"
                    },
                    {
                        "href": "#t97",
                        "title": "4.2 プロファイリングポリシー"
                    }
                ]
            },
            {
                "href": "#s19",
                "title": "C-5. ドメイン 5.0 BYOD（15%）"
            },
            {
                "href": "#s20",
                "title": "C-6. ドメイン 6.0 Endpoint Compliance（10%）"
            },
            {
                "href": "#s21",
                "title": "C-7. ドメイン 7.0 Network Access Device Administration（10%）",
                "subItems": [
                    {
                        "href": "#t98",
                        "title": "7.1 RADIUS と TACACS+ の使い分け"
                    },
                    {
                        "href": "#t99",
                        "title": "7.2 ISE の TACACS+ 設定の流れ"
                    }
                ]
            }
        ]
    },
    {
        "title": "Part D: 300-740 SSCA v2.0（Designing and Implementing Secure Cloud Access for Users and Endpoints）",
        "href": "#p4",
        "items": [
            {
                "href": "#s22",
                "title": "D-1. ドメイン 1.0 Concepts（10%）",
                "subItems": [
                    {
                        "href": "#t100",
                        "title": "1.1 ゼロトラストのフレームワーク"
                    },
                    {
                        "href": "#t101",
                        "title": "1.2 MITRE ATT&CK のクラウド攻撃"
                    },
                    {
                        "href": "#t102",
                        "title": "1.3 パブリッククラウドのセキュリティ要件"
                    },
                    {
                        "href": "#t103",
                        "title": "1.4 運用上の要件"
                    },
                    {
                        "href": "#t104",
                        "title": "1.5 プライベートクラウド"
                    },
                    {
                        "href": "#t105",
                        "title": "1.6 eBPF（Cilium／Tetragon）"
                    }
                ]
            },
            {
                "href": "#s23",
                "title": "D-2. ドメイン 2.0 Identity（20%）",
                "subItems": [
                    {
                        "href": "#t106",
                        "title": "2.1 ID インテリジェンス（Cisco Identity Intelligence）"
                    },
                    {
                        "href": "#t107",
                        "title": "2.2 証明書による認証（ユーザー／デバイス）"
                    },
                    {
                        "href": "#t108",
                        "title": "2.3 MFA（ユーザーとデバイス）"
                    },
                    {
                        "href": "#t109",
                        "title": "2.4 端末ポスチャによるアクセス制御"
                    },
                    {
                        "href": "#t110",
                        "title": "2.5 SAML（モバイル／Web アプリ）"
                    },
                    {
                        "href": "#t111",
                        "title": "2.6 SSO と ID プロビジョニング（SCIM／SAML）"
                    }
                ]
            },
            {
                "href": "#s24",
                "title": "D-3. ドメイン 3.0 Policies（30%）",
                "subItems": [
                    {
                        "href": "#t112",
                        "title": "3.1 暗号化（転送中・保存時）"
                    },
                    {
                        "href": "#t113",
                        "title": "3.2 IPS・DLP・マルウェア対策によるプライベートアクセスの保護"
                    },
                    {
                        "href": "#t114",
                        "title": "3.3 Cisco AI Defense"
                    },
                    {
                        "href": "#t115",
                        "title": "3.4 Secure Access の AI アクセス制御とガードレール"
                    },
                    {
                        "href": "#t116",
                        "title": "3.5 WAF と DDoS 対策"
                    },
                    {
                        "href": "#t117",
                        "title": "3.6 エッジのネットワークセキュリティポリシー（SSE と SD-WAN）"
                    },
                    {
                        "href": "#t118",
                        "title": "3.7 Cisco Secure Workload によるアプリケーション制御（マイクロセグメンテーション）"
                    }
                ]
            },
            {
                "href": "#s25",
                "title": "D-4. ドメイン 4.0 Access（30%）",
                "subItems": [
                    {
                        "href": "#t119",
                        "title": "4.1 DNS セキュリティ"
                    },
                    {
                        "href": "#t120",
                        "title": "4.2 Secure Web Gateway（SWG）"
                    },
                    {
                        "href": "#t121",
                        "title": "4.3 DLP"
                    },
                    {
                        "href": "#t122",
                        "title": "4.4 CASB"
                    },
                    {
                        "href": "#t123",
                        "title": "4.5 プライベートアクセス（ワークロード・拠点）"
                    },
                    {
                        "href": "#t124",
                        "title": "4.6 VPN as a Service・DEM・ZTA"
                    }
                ]
            },
            {
                "href": "#s26",
                "title": "D-5. ドメイン 5.0 Operations（10%）",
                "subItems": [
                    {
                        "href": "#t125",
                        "title": "5.1 可視化とマイクロセグメンテーションのツール選択"
                    },
                    {
                        "href": "#t126",
                        "title": "5.2 フローとテレメトリの解釈"
                    },
                    {
                        "href": "#t127",
                        "title": "5.3 ダッシュボードとレポート"
                    },
                    {
                        "href": "#t128",
                        "title": "5.4 XDR と Splunk への連携"
                    }
                ]
            }
        ]
    },
    {
        "title": "Part E: 300-745 SDSI v1.0（Designing Cisco Security Infrastructure）",
        "href": "#p5",
        "items": [
            {
                "href": "#s27",
                "title": "E-1. ドメイン 1.0 Secure Infrastructure（30%）",
                "subItems": [
                    {
                        "href": "#t129",
                        "title": "1.1 領域別のセキュリティ方針（エンドポイント・ID・メール）"
                    },
                    {
                        "href": "#t130",
                        "title": "1.2 要件に応じたアーキテクチャの変更"
                    },
                    {
                        "href": "#t131",
                        "title": "1.3 VPN とトンネルの選択"
                    },
                    {
                        "href": "#t132",
                        "title": "1.4 管理プレーンと制御プレーンの保護"
                    },
                    {
                        "href": "#t133",
                        "title": "1.5 ファイアウォールの機能・アーキテクチャ選定"
                    }
                ]
            },
            {
                "href": "#s28",
                "title": "E-2. ドメイン 2.0 Applications（25%）",
                "subItems": [
                    {
                        "href": "#t134",
                        "title": "2.1 アプリの要件に基づくソリューション選定"
                    },
                    {
                        "href": "#t135",
                        "title": "2.2 クラウドネイティブアプリのセグメンテーション"
                    },
                    {
                        "href": "#t136",
                        "title": "2.3 新技術に対するポリシー（生成 AI・機械学習・量子）"
                    }
                ]
            },
            {
                "href": "#s29",
                "title": "E-3. ドメイン 3.0 Risk, Events, and Requirements（30%）",
                "subItems": [
                    {
                        "href": "#t137",
                        "title": "3.1 SOC とインシデント対応のツール"
                    },
                    {
                        "href": "#t138",
                        "title": "3.2 リスクを下げる設計変更"
                    },
                    {
                        "href": "#t139",
                        "title": "3.3 インシデント後の設計見直し"
                    },
                    {
                        "href": "#t140",
                        "title": "3.4 フレームワーク"
                    },
                    {
                        "href": "#t141",
                        "title": "3.5 規制・業界基準への適合"
                    }
                ]
            },
            {
                "href": "#s30",
                "title": "E-4. ドメイン 4.0 AI, Automation, and DevSecOps（15%）",
                "subItems": [
                    {
                        "href": "#t142",
                        "title": "4.1 AI がセキュリティインフラで果たす役割"
                    },
                    {
                        "href": "#t143",
                        "title": "4.2 自動化の要素"
                    },
                    {
                        "href": "#t144",
                        "title": "4.3 DevSecOps パイプラインの次の一手"
                    }
                ]
            }
        ]
    },
    {
        "title": "付録",
        "href": "#p6",
        "items": [
            {
                "href": "#s31",
                "title": "付録 A. 旧コンセントレーション（受験終了）の位置づけ"
            },
            {
                "href": "#s32",
                "title": "付録 B. 学習計画の例（12 週間）"
            },
            {
                "href": "#s33",
                "title": "付録 C. 用語集"
            },
            {
                "href": "#s34",
                "title": "付録 D. 参考 URL 一覧（根拠ソース）",
                "subItems": [
                    {
                        "href": "#t145",
                        "title": "D-1. Cisco 公式（認定・試験）"
                    },
                    {
                        "href": "#t146",
                        "title": "D-2. Cisco 製品ドキュメント"
                    },
                    {
                        "href": "#t147",
                        "title": "D-3. 標準・業界ガイダンス"
                    },
                    {
                        "href": "#t148",
                        "title": "D-4. 補足（第三者）"
                    }
                ]
            }
        ]
    }
];

export const DIAGRAMS: Record<string, string> = {
    "d0": "flowchart LR\nA[\"旧: コンセントレーション 7種\"] --> B[\"廃止: SESA / SWSA / SVPN / SAUTO\"]\nA --> C[\"継続: SNCF / SISE\"]\nA --> D[\"名称変更・刷新: SCAZT → SSCA v2.0\"]\nA --> E[\"新設: SDSI\"]\nC --> F[\"現行: SNCF / SISE / SSCA / SDSI の 4 択\"]\nD --> F\nE --> F",
    "d1": "flowchart TD\nS[\"スタート: 3〜5年のセキュリティ実装経験を推奨 正式な前提条件なし\"] --> C[\"コア試験 350-701 SCOR v2.0\"]\nS --> K[\"コンセントレーション試験 (1つ選択)\"]\nC --> W{\"3年以内に もう一方も合格\"}\nK --> W\nW -->|はい| P[\"CCNP Security 認定\"]\nW -->|いいえ| X[\"先に合格した試験は スペシャリスト認定として残る\"]\nC -.->|同時に| CCIE[\"CCIE Security 実技受験資格 (筆記の位置づけ)\"]",
    "d2": "flowchart TD\nQ[\"あなたの主な業務は?\"] --> A{\"どの領域?\"}\nA -->|\"ファイアウォール/IPS の運用\"| N[\"SNCF Secure Firewall\"]\nA -->|\"社内ネットワークの認証・NAC\"| I[\"SISE Cisco ISE\"]\nA -->|\"クラウド利用/リモートアクセス/ZTNA\"| S[\"SSCA Secure Access / Duo\"]\nA -->|\"アーキテクト/コンサル/設計\"| D[\"SDSI セキュリティ設計\"]\nN --> R1[\"実機・GUI操作の知識が活きる\"]\nI --> R2[\"802.1X・ポリシー設計の経験が活きる\"]\nS --> R3[\"SASE/SSE の最新動向が活きる\"]\nD --> R4[\"フレームワークと判断力が問われる\"]",
    "d3": "flowchart LR\nP0[\"Step 0 基礎固め 第3章\"] --> P1[\"Step 1 SCOR v2.0 Part A\"]\nP1 --> P2[\"Step 2 コンセントレーション選択 Part B〜E\"]\nP2 --> P3[\"Step 3 ラボ/ハンズオン\"]\nP3 --> P4[\"Step 4 公式ブループリントで 抜け漏れチェック\"]\nP4 --> P5[\"Step 5 受験\"]",
    "d4": "flowchart TD\nA[\"暗号の種類\"] --> B[\"共通鍵暗号 例: AES 高速・大量データ向き\"]\nA --> C[\"公開鍵暗号 例: RSA / ECC 鍵交換・署名向き\"]\nA --> D[\"ハッシュ 例: SHA-256 改ざん検知\"]\nC --> E[\"PKI: 証明書でなりすましを防ぐ\"]\nB --> F[\"実際の通信: 公開鍵で鍵を共有 → 共通鍵でデータ暗号化\"]\nC --> F",
    "d5": "pie showData\ntitle SCOR v2.0 出題比率 (%)\n\"1.0 Security Concepts\" : 20\n\"2.0 Network Security\" : 25\n\"3.0 Cloud Security\" : 15\n\"4.0 Secure Service Edge\" : 10\n\"5.0 Endpoint Protection and Detection\" : 15\n\"6.0 Network Access, Visibility, and Enforcement\" : 15",
    "d6": "flowchart TD\nA[\"脆弱性スキャン/ベンダー通知\"] --> B[\"CVE を特定\"]\nB --> C[\"CVSS 基本スコアを確認\"]\nC --> D[\"実際の悪用状況を確認 (KEV, EPSS など)\"]\nD --> E[\"資産の重要度・公開有無を加味\"]\nE --> F{\"優先度\"}\nF -->|\"高\"| G[\"緊急パッチ/暫定緩和\"]\nF -->|\"中\"| H[\"計画的に修正\"]\nF -->|\"低\"| I[\"受容/次回メンテ\"]\nG --> J[\"再スキャンで検証\"]\nH --> J\nI --> J",
    "d7": "flowchart LR\nA[\"暗号の棚卸し (どこで何を使っているか)\"] --> B[\"弱い暗号/期限切れの特定\"]\nB --> C[\"暗号アジリティの確保 (設定で切替可能に)\"]\nC --> D[\"ハイブリッド方式で試験導入 (従来 + PQC)\"]\nD --> E[\"段階的に本番移行\"]",
    "d8": "flowchart LR\nA[\"作成 Authoring Talos / SOC / ISAC\"] --> B[\"共有 Sharing STIX / TAXII / pxGrid\"]\nB --> C[\"消費 Consumption FW(TID) / DNS / EDR / SIEM\"]\nC --> D[\"検知結果を新たな情報としてフィードバック\"]\nD --> A",
    "d9": "flowchart LR\nU[\"ユーザー/デバイス\"] --> PEP[\"PEP (ゲートウェイ/Secure Access/FW)\"]\nPEP -->|\"要求を問い合わせ\"| PE[\"PE+PA (ポリシー判断)\"]\nID[\"ID(Duo/IdP)\"] --> PE\nDEV[\"デバイス状態 (Duo Health/ISE/MDM)\"] --> PE\nTI[\"脅威情報/ログ (XDR/SIEM)\"] --> PE\nPE -->|\"許可/拒否\"| PEP\nPEP --> R[\"リソース/アプリ\"]",
    "d10": "flowchart LR\nsubgraph inline[\"インライン構成\"]\nA1[\"クライアント\"] --> F1[\"FTD/IPS\"] --> S1[\"サーバ\"]\nend\nsubgraph passive[\"パッシブ構成\"]\nA2[\"クライアント\"] --> SW[\"スイッチ(SPAN/TAP)\"] --> S2[\"サーバ\"]\nSW -. コピー .-> F2[\"IDS(検知のみ)\"]\nend",
    "d11": "flowchart TD\nA[\"ログイン/アクセスできない\"] --> B{\"AAA サーバに到達できるか? (ping/ポート許可)\"}\nB -->|いいえ| B1[\"経路・FW・ACL・送信元IFを修正\"]\nB -->|はい| C{\"共有鍵・NAS IP は一致?\"}\nC -->|いいえ| C1[\"共有鍵/ネットワークデバイス登録を修正\"]\nC -->|はい| D{\"ID ストア(AD/LDAP)に問題?\"}\nD -->|はい| D1[\"AD 参加状態・時刻差・DNS・証明書を確認\"]\nD -->|いいえ| E{\"サーバのログ(ISE ライブログ) で拒否理由を確認\"}\nE --> F[\"ポリシー/条件/プロファイルを修正\"]\nF --> G[\"再テスト\"]",
    "d12": "flowchart TD\nA[\"パケット受信\"] --> B[\"プレフィルタ (早期ブロック/ファストパス)\"]\nB --> C[\"セキュリティインテリジェンス (悪性 IP/URL/DNS)\"]\nC --> D[\"復号ポリシー (SSL/TLS 復号の要否)\"]\nD --> E[\"ID ポリシー (ユーザー/グループの識別)\"]\nE --> F[\"アクセスコントロールルール (上から順に評価し最初に一致で確定)\"]\nF --> G{\"アクション\"}\nG -->|\"許可(Allow)\"| H[\"侵入防御/ファイル(マルウェア)ポリシーで さらに検査\"]\nG -->|\"信頼(Trust)\"| I[\"以降の深い検査をスキップして通過\"]\nG -->|\"ブロック\"| J[\"拒否\"]\nG -->|\"監視(Monitor)\"| K[\"記録して評価を継続\"]",
    "d13": "flowchart LR\nA[\"1 トポロジ作成 (Point-to-Point/Hub&Spoke)\"] --> B[\"2 エンドポイント指定 (自/相手の IP・IF)\"]\nB --> C[\"3 IKE ポリシー (IKEv2・暗号・DH・認証)\"]\nC --> D[\"4 IPsec プロポーザル (ESP・AES-GCM・PFS)\"]\nD --> E[\"5 保護対象ネットワーク (Local/Remote)\"]\nE --> F[\"6 NAT 除外/ アクセスルールの許可\"]\nF --> G[\"7 展開と確認\"]",
    "d14": "sequenceDiagram\nparticipant A as FTD(拠点A)\nparticipant B as FTD(拠点B)\nA->>B: IKE_SA_INIT (提案・DH公開値・Nonce)\nB-->>A: IKE_SA_INIT 応答 (選択した提案・DH公開値)\nA->>B: IKE_AUTH (ID・認証・最初のChild SA)\nB-->>A: IKE_AUTH 応答 (認証・Child SA 確立)\nA->>B: ESP で暗号化通信(Child SA)\nB-->>A: ESP で暗号化通信",
    "d15": "flowchart TD\nA[\"トンネルが確立しない\"] --> B{\"IKE SA は成立? (show crypto ikev2 sa)\"}\nB -->|いいえ| C[\"UDP 500/4500 の到達性 NAT-T・FW 許可を確認\"]\nC --> C1[\"提案(暗号/DH/ハッシュ)の不一致? PSK/証明書・ID の不一致? 時刻/証明書期限?\"]\nB -->|はい| D{\"IPsec(Child) SA は成立? (show crypto ipsec sa)\"}\nD -->|いいえ| D1[\"保護対象(プロキシID/暗号マップ)不一致 IPsec プロポーザル/PFS 不一致\"]\nD -->|はい| E{\"通信は流れる?\"}\nE -->|いいえ| E1[\"ルーティング・NAT 除外・ACP ルール MTU/MSS(断片化)・非対称経路を確認\"]\nE -->|はい| F[\"完了\"]",
    "d16": "flowchart LR\nU[\"ユーザー/デバイス\"] -->|\"インライン(プロキシ)\"| C[\"CASB / SSE\"]\nC --> S[\"SaaS(Microsoft 365 など)\"]\nS -. \"API 連携で設定/データを監査\" .-> C\nC --> L[\"ログ/アラート(SIEM/XDR)\"]",
    "d17": "flowchart TD\nCTRL[\"MCD コントローラ(SaaS) ポリシー定義/オーケストレーション\"] --> GI[\"イングレス GW\"]\nCTRL --> GE[\"エグレス/EW GW\"]\nI[\"インターネット\"] --> GI --> APP[\"アプリ(VPC/VNet)\"]\nAPP --> GE --> I\nAPP <--> GE <--> APP2[\"別 VPC/VNet のアプリ\"]",
    "d18": "flowchart LR\nA[\"ログ源 AWS/Azure/GCP Cisco 製品\"] --> B[\"取り込み手段 アドオン/アプリ HEC(HTTP Event Collector)\"]\nB --> C[\"インデックス (種類別に分離)\"]\nC --> D[\"CIM で正規化 (共通フィールド化)\"]\nD --> E[\"検索/ダッシュボード/アラート\"]\nE --> F[\"Enterprise Security/SOAR で対応\"]",
    "d19": "flowchart LR\nA[\"コード作成\"] --> B[\"コミット/PR シークレットスキャン SAST\"]\nB --> C[\"ビルド 依存関係(SCA) SBOM 生成\"]\nC --> D[\"IaC/コンテナ検査 設定・脆弱性スキャン\"]\nD --> E[\"テスト DAST/統合テスト\"]\nE --> F[\"署名・承認ゲート\"]\nF --> G[\"デプロイ\"]\nG --> H[\"実行時監視 異常検知/ポリシー適用\"]\nH -->|\"フィードバック\"| A",
    "d20": "flowchart TD\nSASE[\"SASE\"] --> NET[\"ネットワーク機能 (SD-WAN など)\"]\nSASE --> SSE[\"SSE (セキュリティ機能)\"]\nSSE --> SWG[\"SWG Web プロキシ\"]\nSSE --> CASB[\"CASB SaaS 制御\"]\nSSE --> ZTNA[\"ZTNA アプリ単位の接続\"]\nSSE --> FW[\"FWaaS クラウド FW\"]\nSSE --> DNS[\"DNS セキュリティ\"]\nSSE --> DLP[\"DLP\"]",
    "d21": "flowchart TD\nA[\"ユーザー/拠点\"] --> B{\"経路\"}\nB -->|\"Secure Client\"| C[\"Secure Access(SWG へ誘導)\"]\nB -->|\"IPsec トンネル\"| C\nB -->|\"DNS のみ向け先変更\"| D[\"DNS レイヤ保護(名前解決のみ)\"]\nD -->|\"解決後の通信本体は直接\"| F[\"インターネット/SaaS\"]\nC --> E[\"SWG / FW / DLP / ファイル解析\"]\nE --> F\nD --> G[\"ログ/ダッシュボード\"]\nE --> G",
    "d22": "flowchart LR\nU[\"ユーザー\"] -->|\"Secure Client / ブラウザ\"| SA[\"Secure Access\"]\nSA -->|\"プライベートアクセスルール (ID・端末状態で評価)\"| RC[\"リソースコネクタ (社内に配置)\"]\nRC --> APP[\"社内アプリ\"]\nRC -. \"内側から外向きに接続\" .-> SA",
    "d23": "flowchart TD\nA[\"端末が接続を要求\"] --> B[\"ポスチャ状態: 不明\"]\nB --> C[\"検査を実施(ISE ポスチャ/Duo Device Health/MDM)\"]\nC --> D{\"基準を満たすか\"}\nD -->|\"準拠\"| E[\"フルアクセスを許可\"]\nD -->|\"非準拠\"| F[\"隔離ネットワークで修復を案内\"]\nF --> G[\"修復後に再検査\"]\nG --> D",
    "d24": "flowchart LR\nA[\"グループ作成(部署/OS別)\"] --> B[\"ポリシー作成 (監査/保護/サーバー用)\"]\nB --> C[\"除外設定 (業務アプリの誤検知対策)\"]\nC --> D[\"コネクタ配布\"]\nD --> E[\"検知・イベント確認\"]\nE --> F[\"ポリシー調整・隔離・復旧\"]\nF --> B",
    "d25": "flowchart TD\nA[\"イベントを受信\"] --> B{\"自動で隔離・ブロックできたか\"}\nB -->|\"はい\"| C[\"影響範囲を確認(他端末・ファイル軌跡)\"]\nB -->|\"いいえ\"| D[\"端末を隔離して手動対処\"]\nC --> E{\"他の端末にも拡散?\"}\nE -->|\"はい\"| F[\"アウトブレイクコントロールで一括ブロック\"]\nE -->|\"いいえ\"| G[\"原因特定と再発防止\"]\nD --> G\nF --> G\nG --> H[\"クローズ・ポリシー改善\"]",
    "d26": "flowchart LR\nD[\"端末\"] -->|\"802.1X / MAB\"| N[\"スイッチ/無線 LAN(NAD)\"]\nN -->|\"RADIUS\"| I[\"ISE(ポリシー判断)\"]\nI -->|\"AD/LDAP 問い合わせ\"| ID[\"IDストア\"]\nI -->|\"認可結果(VLAN/dACL/SGT)\"| N\nN -->|\"適用\"| D",
    "d27": "sequenceDiagram\nparticipant S as 端末(Supplicant)\nparticipant A as スイッチ(Authenticator)\nparticipant R as ISE(RADIUS)\nS->>A: EAPOL-Start\nA->>S: EAP-Request/Identity\nS->>A: EAP-Response/Identity\nA->>R: RADIUS Access-Request(EAP をカプセル化)\nR-->>A: Access-Challenge(EAP 方式のやり取り)\nA-->>S: EAP メッセージ中継\nS->>R: 認証情報の交換(証明書など)\nR-->>A: Access-Accept(VLAN/dACL/SGT)\nA-->>S: EAP-Success・ポート開放",
    "d28": "flowchart LR\nA[\"端末が MAB/802.1X で接続\"] --> B[\"初期の限定アクセス\"]\nB --> C[\"ISE がプロファイル/ポスチャ/脅威情報を判定\"]\nC --> D[\"CoA を NAD へ送信\"]\nD --> E[\"NAD が再認証を実行\"]\nE --> F[\"新しい認可(VLAN/dACL/SGT)を適用\"]",
    "d29": "flowchart LR\nA[\"テレメトリ収集 (端末/NW/クラウド/ID/メール)\"] --> B[\"検知 (ルール/AI・ML)\"]\nB --> C[\"相関・インシデント化 (XDR/SIEM)\"]\nC --> D[\"調査 (コンテキスト/脅威情報)\"]\nD --> E[\"対応(SOAR) 隔離/ブロック/チケット\"]\nE --> F[\"振り返り・チューニング\"]\nF --> B",
    "d30": "flowchart TD\nA[\"ユーザーがアプリにアクセス\"] --> B[\"Duo: ID の確認(MFA/SSO)\"]\nB --> C[\"端末の確認(登録/ヘルス)\"]\nC --> D{\"ポリシー判定\"}\nD -->|\"条件を満たす\"| E[\"許可\"]\nD -->|\"リスクあり\"| F[\"追加認証(Verified Push/FIDO2)\"]\nD -->|\"非準拠\"| G[\"拒否・修復案内\"]\nE --> H[\"Trust Monitor が継続的に異常を分析\"]",
    "d31": "pie showData\ntitle SNCF v1.2 出題比率 (%)\n\"1.0 Deployment\" : 30\n\"2.0 Configuration\" : 30\n\"3.0 Management and Troubleshooting\" : 25\n\"4.0 Integration\" : 15",
    "d32": "flowchart LR\nSW1[\"上位スイッチ\"] --- A[\"FTD アクティブ\"]\nSW1 --- B[\"FTD スタンバイ\"]\nA <-->|\"フェールオーバーリンク / ステートフルリンク\"| B\nFMC[\"FMC\"] -->|\"管理\"| A\nFMC -->|\"管理\"| B\nA --> SW2[\"下位スイッチ\"]\nB --> SW2",
    "d33": "flowchart TD\nA[\"インタフェースで受信\"] --> B[\"プレフィルタ\"]\nB --> C[\"セキュリティインテリジェンス\"]\nC --> D[\"復号\"]\nD --> E[\"ID の解決\"]\nE --> F[\"アクセスコントロールルール\"]\nF --> G[\"侵入防御/ファイルポリシー\"]\nG --> H[\"NAT/ルーティング/VPN 処理\"]\nH --> I[\"送出\"]",
    "d34": "flowchart TD\nA[\"通信できない\"] --> B[\"Packet Tracer で段階ごとの結果を確認\"]\nB --> C{\"どの段階で拒否?\"}\nC -->|\"NAT/ルーティング\"| D[\"NAT ルール・経路を修正\"]\nC -->|\"ACP\"| E[\"ルールの順序・条件・ゾーンを修正\"]\nC -->|\"IPS/ファイル\"| F[\"侵入/ファイルイベントで原因を確認\"]\nC -->|\"拒否されていない\"| G[\"キャプチャで両側の到達を確認\"]\nG --> H[\"上流・下流・端末側の問題を切り分け\"]",
    "d35": "flowchart LR\nFTD[\"Secure Firewall / FMC\"] <--> MD[\"Malware Defense (Secure Malware Analytics)\"]\nFTD <--> SE[\"Secure Endpoint\"]\nFTD <--> TID[\"Threat Intelligence Director (STIX/TAXII)\"]\nFTD <--> ISE[\"ISE (pxGrid)\"]\nFTD --> XDR[\"Cisco XDR\"]\nFTD --> SAL[\"Security Analytics and Logging\"]\nFTD --> SP[\"Splunk\"]",
    "d36": "pie showData\ntitle SISE v1.2 出題比率 (%)\n\"1.0 Architecture and Deployment\" : 10\n\"2.0 Policy Enforcement\" : 25\n\"3.0 Web Auth and Guest Services\" : 15\n\"4.0 Profiler\" : 15\n\"5.0 BYOD\" : 15\n\"6.0 Endpoint Compliance\" : 10\n\"7.0 Network Access Device Administration\" : 10",
    "d37": "flowchart TD\nADM[\"管理者\"] --> PAN[\"PAN(主/副)\"]\nPAN --> PSN1[\"PSN 1\"]\nPAN --> PSN2[\"PSN 2\"]\nPAN --> MNT[\"MnT(主/副)\"]\nNAD[\"スイッチ/無線 LAN/VPN\"] -->|\"RADIUS/TACACS+\"| LB[\"ロードバランサ(任意)\"]\nLB --> PSN1\nLB --> PSN2\nPSN1 --> MNT\nPSN2 --> MNT\nPSN1 <--> ID[\"AD/LDAP\"]\nPSN2 <--> ID",
    "d38": "flowchart LR\nU[\"従業員 PC\"] -->|\"認証成功: SGT=Employees\"| SW[\"スイッチ(分類・伝播)\"]\nSW -->|\"SGT 付きパケット\"| FW[\"強制点(スイッチ/FW)\"]\nFW -->|\"SGACL: Employees→Servers 許可/拒否\"| SRV[\"サーバー(SGT=Servers)\"]\nISE[\"ISE: マトリクス定義と配布\"] -.-> FW",
    "d39": "flowchart TD\nA[\"RADIUS 要求を受信\"] --> B[\"ポリシーセットの選択 (条件: NAD の種類/場所/プロトコル)\"]\nB --> C[\"認証ポリシー (どの ID ストアで本人確認)\"]\nC --> D[\"認可ポリシー (グループ/端末種別/状態/時間)\"]\nD --> E[\"認可プロファイル (VLAN/dACL/SGT/リダイレクト)\"]\nE --> F[\"Access-Accept を NAD へ\"]",
    "d40": "sequenceDiagram\nparticipant C as ゲスト端末\nparticipant N as スイッチ/WLC\nparticipant I as ISE\nC->>N: 接続(MAB)\nN->>I: Access-Request(MAC)\nI-->>N: Access-Accept(リダイレクト URL・ACL)\nC->>N: Web アクセス(HTTP)\nN-->>C: ISE ゲストポータルへリダイレクト\nC->>I: ログイン/登録\nI->>N: CoA(再認証)\nN->>I: 再認証 Access-Request\nI-->>N: Access-Accept(ゲスト権限)",
    "d41": "flowchart LR\nA[\"RADIUS/DHCP/HTTP/SNMP などの属性\"] --> B[\"プロファイリングポリシーで評価\"]\nB --> C[\"確実性係数が閾値を超えたら分類\"]\nC --> D[\"エンドポイントプロファイル更新\"]\nD --> E[\"CoA で認可を更新\"]",
    "d42": "sequenceDiagram\nparticipant U as 私物端末\nparticipant N as WLC/スイッチ\nparticipant I as ISE\nU->>N: 接続(オープン/PEAP SSID)\nN->>I: 認証要求\nI-->>N: BYOD ポータルへリダイレクト\nU->>I: ログイン・端末登録\nI->>U: サプリカント設定ウィザードで証明書とプロファイルを配布\nU->>N: EAP-TLS で再接続\nN->>I: 認証要求(証明書)\nI-->>N: 許可(BYOD 用の権限)",
    "d43": "flowchart TD\nA[\"端末が接続\"] --> B[\"状態: 不明 → ポスチャポータルへリダイレクト\"]\nB --> C[\"エージェントを配布/起動\"]\nC --> D[\"ポスチャ条件を検査\"]\nD --> E{\"結果\"}\nE -->|\"準拠\"| F[\"CoA で通常権限を付与\"]\nE -->|\"非準拠\"| G[\"修復を案内 → 修復用の限定アクセス\"]\nG --> D",
    "d44": "flowchart LR\nA[\"1 PSN で Device Admin サービスを有効化\"] --> B[\"2 ネットワークデバイス登録 (TACACS+ 共有鍵)\"]\nB --> C[\"3 TACACS プロファイル (権限レベル)\"]\nC --> D[\"4 コマンドセット (許可/拒否するコマンド)\"]\nD --> E[\"5 Device Admin ポリシーセット (認証 → 認可)\"]\nE --> F[\"6 アカウンティングの確認\"]",
    "d45": "pie showData\ntitle SSCA v2.0 出題比率 (%)\n\"1.0 Concepts\" : 10\n\"2.0 Identity\" : 20\n\"3.0 Policies\" : 30\n\"4.0 Access\" : 30\n\"5.0 Operations\" : 10",
    "d46": "sequenceDiagram\nparticipant U as ユーザー\nparticipant S as SP(アプリ)\nparticipant I as IdP\nU->>S: アプリにアクセス\nS-->>U: IdP へリダイレクト(SAML 要求)\nU->>I: ログイン(MFA)\nI-->>U: 署名付きアサーション\nU->>S: アサーションを提示\nS-->>U: ログイン完了",
    "d47": "flowchart LR\nA[\"1 エージェント展開 (または各種コネクタ)\"] --> B[\"2 ラベルとスコープの定義 (アプリ/環境/所有者)\"]\nB --> C[\"3 通信の可視化 (アプリケーション依存関係マッピング)\"]\nC --> D[\"4 ポリシーの自動提案\"]\nD --> E[\"5 分析・シミュレーション (影響確認)\"]\nE --> F[\"6 強制 (OS のファイアウォール等で適用)\"]\nF --> G[\"7 継続的な検証・脆弱性評価\"]",
    "d48": "flowchart LR\nU[\"ユーザー/デバイス\"] -->|\"Secure Client / ブラウザ / 拠点トンネル\"| SA[\"Cisco Secure Access\"]\nSA --> DNS[\"DNS セキュリティ\"]\nSA --> SWG[\"SWG\"]\nSA --> DLP[\"DLP\"]\nSA --> CASB[\"CASB\"]\nSA --> ZTNA[\"ZTNA / VPNaaS\"]\nDNS --> NET[\"インターネット/SaaS\"]\nSWG --> NET\nCASB --> NET\nZTNA -->|\"リソースコネクタ / トンネル\"| PRI[\"社内/クラウドのプライベートアプリ\"]",
    "d49": "pie showData\ntitle SDSI v1.0 出題比率 (%)\n\"1.0 Secure Infrastructure\" : 30\n\"2.0 Applications\" : 25\n\"3.0 Risk, Events, and Requirements\" : 30\n\"4.0 AI, Automation, and DevSecOps\" : 15",
    "d50": "flowchart TD\nA[\"要件・脅威の整理\"] --> B[\"守るべき資産/ビジネスフローの特定\"]\nB --> C[\"必要なセキュリティ機能の洗い出し(SAFE)\"]\nC --> D[\"配置場所の決定(PIN)\"]\nD --> E[\"製品・技術の選定\"]\nE --> F[\"段階的な展開計画\"]\nF --> G[\"運用・改善\"]",
    "d51": "flowchart LR\nA[\"準備 (体制/手順/ツール)\"] --> B[\"検知・分析\"]\nB --> C[\"封じ込め\"]\nC --> D[\"根絶\"]\nD --> E[\"復旧\"]\nE --> F[\"事後対応 (教訓の反映)\"]\nF --> A",
    "d52": "flowchart TD\nA[\"コミット/プルリクエスト\"] --> B{\"シークレット/SAST の結果\"}\nB -->|\"重大な指摘あり\"| X[\"ビルド失敗・開発者へフィードバック\"]\nB -->|\"問題なし\"| C[\"ビルド・SCA・SBOM\"]\nC --> D{\"重大な脆弱性?\"}\nD -->|\"あり\"| X\nD -->|\"なし\"| E[\"IaC/コンテナのポリシー検査\"]\nE --> F{\"ポリシー違反?\"}\nF -->|\"あり\"| X\nF -->|\"なし\"| G[\"署名・承認ゲート\"]\nG --> H[\"段階的デプロイ(カナリア)\"]\nH --> I{\"異常検知?\"}\nI -->|\"あり\"| R[\"自動ロールバック\"]\nI -->|\"なし\"| J[\"全体展開・監視継続\"]"
};
