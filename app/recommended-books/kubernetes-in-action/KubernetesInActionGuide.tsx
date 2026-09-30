'use client';

import React, { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
    label: string;
}

const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

export function KubernetesInActionGuide() {
    return (
        <div className="kia-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <div className="hero">
                        <div className="kicker">
                            Kubernetes in Action, Second Edition &middot; 初学者向け解説ガイド
                        </div>
                        <h1>
                            Kubernetes in Action, Second Edition 完全解説ガイド ―
                            初学者のためのステップバイステップ入門
                        </h1>
                        <div className="meta-row">
                            <span className="pill">
                                対象 <strong>初学者〜中級者</strong>
                            </span>
                            <span className="pill">
                                原著構成 <strong>全5部18章 + 独自追加6部</strong>
                            </span>
                            <span className="pill">
                                図解 <strong>Mermaid 41点</strong>
                            </span>
                            <span className="pill">
                                参考文献 <strong>27件</strong>
                            </span>
                        </div>
                    </div>

                    <h2 id="about">この記事について</h2>
                    <p>
                        <em>Kubernetes in Action, Second Edition</em>（ISBN 9781617297618）は、Red
                        HatでKubernetesに深く関わってきたMarko LukšaとKevin
                        Connerによる、Kubernetesの定番入門書です。第1版は全世界で数万人の開発者に読まれ、第2版ではKubernetes
                        APIそのものの解説やGateway
                        APIなど、2020年代後半のKubernetesエコシステムに合わせた大幅な刷新が行われています。
                    </p>
                    <p>
                        原著は以下の5部・18章構成です（O&apos;Reilly公式掲載ページおよびManning公式ページの目次で確認済み）。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">Part</th>
                                    <th scope="col">章</th>
                                    <th scope="col">タイトル（原題）</th>
                                    <th scope="col">本ガイドでの扱い</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Part 1: Getting started</td>
                                    <td>1〜4</td>
                                    <td>
                                        Kubernetesの導入、コンテナの理解、初回デプロイ、APIとオブジェクトモデル
                                    </td>
                                    <td>第1部</td>
                                </tr>
                                <tr className="even">
                                    <td>Part 2: Running applications in Kubernetes</td>
                                    <td>5〜7</td>
                                    <td>Pod、ライフサイクル、名前空間とラベル</td>
                                    <td>第2部</td>
                                </tr>
                                <tr className="odd">
                                    <td>Part 3: Application configuration and storage</td>
                                    <td>8〜10</td>
                                    <td>ConfigMap/Secret、ボリューム、PersistentVolume</td>
                                    <td>第3部</td>
                                </tr>
                                <tr className="even">
                                    <td>Part 4: Connecting and exposing applications</td>
                                    <td>11〜13</td>
                                    <td>Service、Ingress、Gateway API</td>
                                    <td>第4部</td>
                                </tr>
                                <tr className="odd">
                                    <td>Part 5: Managing applications at scale</td>
                                    <td>14〜18</td>
                                    <td>ReplicaSet、Deployment、StatefulSet、DaemonSet、Job/CronJob</td>
                                    <td>第5部</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        本ガイドではこれに加えて、原著の範囲外である<strong>2026年8月時点の最新動向</strong>（第6部）、学習ロードマップ、ベストプラクティスチェックリスト、用語集、参考文献を独自に追加しています。原著は688ページ・20時間44分（O&apos;Reilly記載）の分量があるため、本ガイドは各章の要点と実践的な落とし穴を凝縮した「地図」として使い、詳細な検証は原著・公式ドキュメントで補うことを想定しています。
                    </p>
                    <p>
                        <strong>出典：</strong> O&apos;Reilly公式書籍ページ (
                        <a href="https://www.oreilly.com/library/view/kubernetes-in-action/9781617297618/">
                            https://www.oreilly.com/library/view/kubernetes-in-action/9781617297618/
                        </a>
                        ) および目次ページ (
                        <a href="https://www.oreilly.com/library/view/kubernetes-in-action/9781617297618/Text/contents.html">
                            https://www.oreilly.com/library/view/kubernetes-in-action/9781617297618/Text/contents.html
                        </a>
                        )、Manning公式書籍ページ (
                        <a href="https://www.manning.com/books/kubernetes-in-action-second-edition">
                            https://www.manning.com/books/kubernetes-in-action-second-edition
                        </a>
                        )
                    </p>
                    <hr />

                    <h2 id="part0">第0部: コンテナ技術の基礎（本書の前提知識）</h2>
                    <p>
                        原著は「読者にDockerやコンテナの経験は不要」と明言していますが（O&apos;Reillyページの
                        About the Reader:
                        <em>
                            &quot;Written for intermediate software developers. No prior experience with
                            Kubernetes or containers is required.&quot;
                        </em>
                        ）、第2章でコンテナの基礎をかなり丁寧に扱っています。本ガイドでもまずコンテナの基礎から入り、Kubernetesの必然性を理解できるようにします。
                    </p>

                    <h3 id="0-1">0.1 コンテナとVMの違い</h3>
                    <p>
                        仮想マシン（VM）はハイパーバイザー上でゲストOS全体を仮想化するのに対し、コンテナはホストOSのカーネル機能（Linux
                        Namespaces・cgroups）を使ってプロセスを隔離する軽量な仮想化技術です。原著2.1.1節「Comparing
                        containers to
                        VMs」で扱われる通り、コンテナはVMに比べて起動が速く、オーバーヘッドが小さいという特徴があります。
                    </p>
                    <Diagram id="diag-1" label="仮想マシン方式とコンテナ方式のアーキテクチャ比較図" />
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス（原著2.3節準拠）</div>
                            <ul>
                                <li>
                                    コンテナはプロセスの隔離であってVMのような完全な隔離ではないため、マルチテナント環境では追加のセキュリティ境界（gVisor、Kata
                                    Containersなど）の採用を検討する。
                                </li>
                                <li>
                                    1コンテナ1プロセス（1責務）を基本原則とし、コンテナ内でinitシステムやSSHデーモンを常駐させない。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="0-2">0.2 Dockerとコンテナランタイム</h3>
                    <p>
                        原著2.1.2〜2.1.3節では、Dockerを使ってHello,
                        Worldコンテナを起動する体験から始まり、2.2節で本書全体を通して使う実践的な題材アプリケーション「Kiada（Kubernetes
                        in Action Demo
                        Application）」の構築へと進みます。Kiadaは、原著全編を通して機能を段階的に拡張していくNode.jsベースのデモアプリケーションです。
                    </p>
                    <Diagram id="diag-2" label="コンテナイメージのビルド・プッシュ・プルのライフサイクルフロー" />

                    <h3 id="0-3">0.3 OCI標準とコンテナ代替ツール</h3>
                    <p>
                        原著2.1.4節では、Docker以外のコンテナツール（Podman、Buildahなど）とOpen
                        Container
                        Initiative（OCI）によるイメージ・ランタイムの標準化について触れています。Kubernetes自体はDockerを直接のコンテナランタイムとして使うDockershimを2020年12月のv1.20で非推奨化し、2022年5月のv1.24で削除しており、containerdやCRI-OなどCRI（Container
                        Runtime Interface）準拠のランタイムを使うのが2026年時点の標準です。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ツール</th>
                                    <th scope="col">役割</th>
                                    <th scope="col">備考</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Docker Engine</td>
                                    <td>イメージビルド・実行</td>
                                    <td>
                                        <code>docker</code>
                                        CLIの提供元。Kubernetesのノード上ランタイムとしては非推奨
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>containerd</td>
                                    <td>軽量なコンテナランタイム</td>
                                    <td>多くのマネージドKubernetes（EKS、GKEなど）の既定ランタイム</td>
                                </tr>
                                <tr className="odd">
                                    <td>CRI-O</td>
                                    <td>Kubernetes専用ランタイム</td>
                                    <td>Red Hat OpenShiftなどで採用</td>
                                </tr>
                                <tr className="even">
                                    <td>Podman</td>
                                    <td>デーモンレスなコンテナ管理CLI</td>
                                    <td>rootlessコンテナに強み</td>
                                </tr>
                                <tr className="odd">
                                    <td>Buildah</td>
                                    <td>OCIイメージビルド専用ツール</td>
                                    <td>Dockerfileなしでもビルド可能</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    ローカル開発ではDocker Desktop／Podman
                                    Desktopのどちらでも良いが、本番クラスタのノードランタイムはcontainerdかCRI-Oに統一する。
                                </li>
                                <li>
                                    イメージはOCIイメージ仕様に準拠したレジストリ（Docker Hub、GitHub
                                    Container Registry、Amazon ECR、Google Artifact
                                    Registryなど）で管理し、タグに<code>latest</code>を使わずセマンティックバージョンまたはコミットハッシュを付与する。ただしタグは後から別のイメージへ付け替えられる可変の参照であり、それ自体はバージョンを固定しない。本番環境では<code>image@sha256:&lt;ダイジェスト&gt;</code>形式のダイジェスト参照でイメージを一意に固定し、あわせてCosign等による署名検証（Sigstore）をデプロイ前のゲートに組み込む。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />

                    <h2 id="part1">第1部: Kubernetesを始める（原著Part 1: 第1〜4章）</h2>
                    <h3 id="1-1">1.1 Kubernetesとは何か（原著第1章）</h3>
                    <p>
                        <strong>Kubernetes</strong>
                        はギリシャ語で「操舵手（helmsman）」を意味します。原著1章のまとめでも触れられている通り、船長（あなた）がクラスタ全体を統括し、Kubernetesという操舵手が日々の運用（コンテナの再起動、ノード障害時の再配置、負荷分散など）を担うというメタファーです。発音は「クーバネティス」（koo-ber-NET-eez）が一般的で、しばしば「K8s（ケーエイツ）」と略されます（KとSの間の8文字を数字の8に置き換えた略記）。
                    </p>
                    <p>
                        Kubernetesは、Googleが自社の大規模クラスタ管理システム「Borg」で得た知見をもとに開発し、2014年にオープンソース化したプロジェクトです。現在はCloud
                        Native Computing
                        Foundation（CNCF）がホストする最重要プロジェクトの一つとなっています。
                    </p>
                    <Diagram id="diag-3" label="Kubernetes導入前後のサーバー管理とクラスタ抽象化の比較図" />
                    <p>
                        原著1.2.1節が強調するのは、Kubernetesが<strong>個々のマシンではなくクラスタ全体を1つのデプロイ領域として抽象化する</strong>という点です。開発者は「どのサーバーで動かすか」を意識せず、「どういう状態で動いてほしいか」だけを宣言します。
                    </p>
                    <p>
                        <strong>Kubernetesを使う主なメリット（原著1.2.2節）</strong>
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">メリット</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>セルフサービス化</td>
                                    <td>開発者がインフラ管理者の介入なしにアプリをデプロイできる</td>
                                </tr>
                                <tr className="even">
                                    <td>コスト削減</td>
                                    <td>
                                        複数アプリのリソースを効率よくビンパッキングし、ハードウェア利用率を上げる
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>自動スケーリング</td>
                                    <td>負荷に応じてPodやノード数を自動調整する</td>
                                </tr>
                                <tr className="even">
                                    <td>自己修復</td>
                                    <td>コンテナクラッシュやノード障害時に自動的に再配置する</td>
                                </tr>
                                <tr className="odd">
                                    <td>ポータビリティ</td>
                                    <td>
                                        オンプレミス・複数クラウド間で同じAPIを使い回せる（ベンダーロックイン低減）
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>組織導入時の判断基準（原著1.3節）</strong>
                    </p>
                    <p>
                        原著1.3.4節「Should you even use
                        Kubernetes?」は初学者が見落としがちな重要な問いです。すべてのワークロードにKubernetesが必要なわけではありません。
                    </p>
                    <Diagram id="diag-4" label="Kubernetes導入要否と運用体制を判断するフローチャート" />
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    小規模なチームや単一のモノリシックアプリケーションでは、まずマネージドKubernetes（GKE
                                    Autopilot、EKS Fargate、AKSなど）から始め、運用負荷を最小化する。
                                </li>
                                <li>
                                    自前でKubernetesクラスタ全体（コントロールプレーンを含む）を運用するのは非常に難易度が高いため、専任のプラットフォームチームなしに選択すべきではない、と原著は繰り返し強調している。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="1-2">1.2 Kubernetesクラスタのアーキテクチャ（原著第1章・第3章）</h3>
                    <p>
                        Kubernetesクラスタは大きく<strong>コントロールプレーン</strong>と<strong>ワーカーノード（ワークロードプレーン）</strong>の2つの平面に分かれます（原著1.2.3節）。
                    </p>
                    <Diagram id="diag-5" label="Kubernetesコントロールプレーンとワーカーノードのアーキテクチャ構成図" />
                    <p>各コンポーネントの役割は次の通りです（原著1.2.3節に対応）。</p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コンポーネント</th>
                                    <th scope="col">配置</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>kube-apiserver</td>
                                    <td>コントロールプレーン</td>
                                    <td>
                                        クラスタの唯一の入口。REST
                                        APIを公開し、全ての操作はここを経由する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>etcd</td>
                                    <td>コントロールプレーン</td>
                                    <td>クラスタ全体の状態を保存する分散キーバリューストア</td>
                                </tr>
                                <tr className="odd">
                                    <td>kube-scheduler</td>
                                    <td>コントロールプレーン</td>
                                    <td>未配置のPodを、条件に合うワーカーノードへ割り当てる</td>
                                </tr>
                                <tr className="even">
                                    <td>kube-controller-manager</td>
                                    <td>コントロールプレーン</td>
                                    <td>
                                        ReplicaSetコントローラ等、各種コントローラをまとめて実行する
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>kubelet</td>
                                    <td>ワーカーノード</td>
                                    <td>
                                        ノード上でPodのライフサイクルを管理し、APIサーバーと通信する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>kube-proxy</td>
                                    <td>ワーカーノード</td>
                                    <td>Serviceへのトラフィックをノード上でルーティングする</td>
                                </tr>
                                <tr className="odd">
                                    <td>コンテナランタイム</td>
                                    <td>ワーカーノード</td>
                                    <td>実際にコンテナを起動・停止する（containerd、CRI-Oなど）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>Kubernetesがアプリケーションを実行する流れ（原著1.2.4節）</strong>
                    </p>
                    <Diagram id="diag-6" label="kubectl applyからPodが起動するまでのシーケンス図" />
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    コントロールプレーンは通常、可用性のため奇数（3・5台等）のノードで冗長化し、etcdのリーダー選出クォーラムを確保する。マネージドサービスを使う場合はこの管理をクラウドプロバイダに委任できる。
                                </li>
                                <li>
                                    <code>kubectl get events</code>や<code>kubectl describe</code>
                                    は、宣言と実際の状態のズレをデバッグする際の最初の一手として習慣化する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="1-3">1.3 最初のアプリケーションをデプロイする（原著第3章）</h3>
                    <p>
                        原著3章では、ローカル環境（Docker
                        Desktop内蔵Kubernetes、Minikube、kind）からマネージドクラウド（GKE、EKS）、さらには手動構築のマルチノードクラスタまで、複数のクラスタ構築方法を比較しています。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">方法</th>
                                    <th scope="col">用途</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Docker Desktop内蔵K8s</td>
                                    <td>ローカル学習</td>
                                    <td>GUIから有効化でき最も手軽</td>
                                </tr>
                                <tr className="even">
                                    <td>Minikube</td>
                                    <td>ローカル学習・検証</td>
                                    <td>単一VM/コンテナ内に1ノードクラスタを構築、アドオンが豊富</td>
                                </tr>
                                <tr className="odd">
                                    <td>kind (Kubernetes in Docker)</td>
                                    <td>ローカル・CI</td>
                                    <td>
                                        Dockerコンテナをノードに見立てるため多ノードクラスタもCI上で高速に作れる
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>GKE (Google Kubernetes Engine)</td>
                                    <td>本番・学習</td>
                                    <td>
                                        Googleのマネージドサービス、Autopilotモードでノード管理も不要
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Amazon EKS</td>
                                    <td>本番</td>
                                    <td>AWSのマネージドコントロールプレーン、ワーカーはEC2/Fargate</td>
                                </tr>
                                <tr className="even">
                                    <td>手動構築（kubeadm等）</td>
                                    <td>学習・オンプレミス</td>
                                    <td>全コンポーネントを自分で構築し理解を深めるのに最適</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>kubectlの基本操作フロー</strong>
                    </p>
                    <Diagram id="diag-7" label="kubectlによるクラスタ操作とトラブルシューティングの基本フロー" />
                    <p>
                        原著3.3節では、最初のアプリケーションを<code>kubectl create deployment</code>
                        で作成し、<code>kubectl expose</code>でServiceを作成し、
                        <code>kubectl scale</code>
                        で水平スケールするという一連の流れを体験します。<code>kubectl expose</code>
                        が行うのはServiceの作成であり、それ自体が自動的に外部公開を行うわけではありません（既定では<code>ClusterIP</code>でクラスタ内部からのみ到達可能）。クラスタ外部からアクセスさせたい場合は<code>--type=NodePort</code>または<code>--type=LoadBalancer</code>を明示的に指定します。これは第5部（Deployment、Service）で扱う概念の実践的な入り口になっています。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    学習段階ではkindまたはMinikubeでローカルに複数ノードクラスタを再現し、Podのスケジューリングやノード障害時の挙動を安全に試す。
                                </li>
                                <li>
                                    <code>kubectl config use-context</code>
                                    でクラスタを切り替える際は、
                                    <code>kubectl config current-context</code>
                                    で必ず現在の接続先を確認してから破壊的な操作を行う（本番クラスタへの誤操作防止）。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="1-4">1.4 Kubernetes APIとオブジェクトモデル（原著第4章）</h3>
                    <p>
                        原著4章は第2版で大きく拡充されたパートです。Kubernetesを深く理解する上で欠かせない「すべてがAPIオブジェクトである」という設計思想を扱います。
                    </p>
                    <Diagram id="diag-8" label="マニフェスト宣言からコントローラの調整ループ（Reconciliation）の流れ" />
                    <p>
                        Kubernetesオブジェクトのマニフェストは<code>apiVersion</code>・<code>kind</code>・<code>metadata</code>を共通で持ち、多くのオブジェクトはこれに加えて<code>spec</code>（および<code>status</code>）を持ちます。ただし<code>spec</code>はすべてのオブジェクトに必須の共通フィールドではありません。例えば<code>ConfigMap</code>は<code>spec</code>を持たず、<code>data</code>・<code>binaryData</code>・<code>immutable</code>をトップレベルのフィールドとして使います（<code>Secret</code>も同様に<code>data</code>/<code>stringData</code>を使います）。<code>spec</code>は「あるべき姿」をユーザーが宣言する部分であり、<code>status</code>はコントローラが実際の観測結果を書き込む部分です。この分離こそが、Kubernetesの<strong>宣言的（declarative）</strong>なモデルの核心です。
                    </p>
                    <p>
                        <strong>Event オブジェクト（原著4.3節）</strong>
                    </p>
                    <p>
                        クラスタ内で発生したイベント（Podのスケジューリング成功、イメージPull失敗など）は<code>Event</code>オブジェクトとして記録されます。
                        <code>kubectl describe</code>
                        コマンドの出力末尾に表示される「Events」セクションは、このEventオブジェクトを整形して表示したものです。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    未知のリソース種別に遭遇したら
                                    <code>kubectl explain &lt;kind&gt;</code>
                                    （例:
                                    <code>kubectl explain pod.spec.containers</code>
                                    ）でフィールドの説明とAPIバージョンをその場で確認する習慣をつける。
                                </li>
                                <li>
                                    <code>kubectl describe</code>で表示されるstatus
                                    conditions（<code>Ready</code>,
                                    <code>PodScheduled</code>
                                    など）を読み解けるようになると、トラブルシューティングの速度が大きく向上する。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                </main>
            </div>
        </div>
    );
}
