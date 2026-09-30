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
                    <h2 id="part2">第2部: Podでアプリケーションを実行する（原著Part 2: 第5〜7章）</h2>
                    <h3 id="2-1">2.1 Podの基本（原著第5章）</h3>
                    <p>
                        <strong>Pod</strong>
                        はKubernetesにおけるデプロイの最小単位です。1つ以上のコンテナのグループであり、同じネットワーク名前空間（同一IPアドレス、<code>localhost</code>経由の通信）とストレージボリュームを共有します。
                    </p>
                    <Diagram id="diag-9" label="Pod内部でのコンテナ間ネットワーク・ボリューム共有構造" />
                    <p>
                        原著5.1.2節が強調するのは、「複数コンテナを1つのPodに詰め込みすぎない」という原則です。基本は1コンテナ1責務ですが、密結合したヘルパー（ログ収集、プロキシなど）は同じPodに配置します。
                    </p>
                    <p>
                        <strong>マルチコンテナPodの構成パターン（原著5.4〜5.5節）</strong>
                    </p>
                    <Diagram id="diag-10" label="initContainersとネイティブサイドカー、メインコンテナの起動シーケンス" />
                    <p>
                        原著5.5.4節「Kubernetes native sidecar
                        containers」は、<code>initContainers</code>に<code>restartPolicy: Always</code>
                        を指定することでサイドカーをネイティブにサポートする仕組みを解説しています（Kubernetes
                        1.28でアルファ導入、1.29でデフォルト有効化、1.33で安定版。詳細は<a href="#6-5">6.5節</a>を参照）。これにより、従来のサイドカーパターンで課題だった「Jobのサイドカーがいつまでも終了せず、Jobの完了判定をブロックしてしまう」問題が解消されました。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス（原著5.3〜5.6節）</div>
                            <ul>
                                <li>
                                    Pod内のコンテナとやり取りする際は
                                    <code>kubectl exec -it &lt;pod&gt; -- sh</code>
                                    より先に<code>kubectl logs</code>
                                    で挙動を確認し、本番環境への<code>exec</code>は最小限にとどめる。
                                </li>
                                <li>
                                    デバッグ専用の<code>ephemeralContainers</code>（原著5.3.6節）を使えば、実行中のPodに影響を与えずにデバッグ用ツールコンテナを一時的に注入できる。distrolessイメージなどシェルを含まない本番イメージのデバッグに有効。
                                </li>
                                <li>
                                    <code>kubectl delete pods --all</code>
                                    のような広範囲削除コマンドは、必ず<code>-n &lt;namespace&gt;</code>でスコープを絞ってから実行する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="2-2">2.2 Podのライフサイクルとヘルスチェック（原著第6章）</h3>
                    <p>
                        Podには<code>phase</code>（大まかな状態）と、より詳細な<code>conditions</code>（複数のブール値の集合）があります。
                    </p>
                    <Diagram id="diag-11" label="Podのライフサイクル状態遷移図（Pending/Running/Succeeded/Failed）" />
                    <p>
                        <strong>3種類のプローブ（原著6.2節）</strong>
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">プローブ種別</th>
                                    <th scope="col">目的</th>
                                    <th scope="col">失敗時の挙動</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Liveness Probe</td>
                                    <td>コンテナが生きているか（デッドロック等の検知）</td>
                                    <td>コンテナを再起動する</td>
                                </tr>
                                <tr className="even">
                                    <td>Readiness Probe</td>
                                    <td>リクエストを受け付けられる状態か</td>
                                    <td>Serviceのエンドポイントから除外する（再起動はしない）</td>
                                </tr>
                                <tr className="odd">
                                    <td>Startup Probe</td>
                                    <td>起動が遅いアプリの初期化完了を待つ</td>
                                    <td>Liveness/Readinessの評価を遅らせる</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-12" label="Startup Probe、Liveness Probe、Readiness Probeの判定フローチャート" />
                    <p>
                        原著6.3節では、<code>postStart</code>フック（コンテナ起動直後に実行）と<code>preStop</code>フック（終了直前に実行）にも触れています。特に<code>preStop</code>はグレースフルシャットダウンの実装に欠かせません。
                    </p>
                    <Diagram id="diag-13" label="Pod削除時のpreStopフックとSIGTERM、SIGKILL終了シーケンス" />
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">
                                ベストプラクティス（原著6.2.7節「Creating effective liveness probe handlers」）
                            </div>
                            <ul>
                                <li>
                                    Liveness
                                    Probeは「アプリが応答するか」だけを軽量にチェックし、データベース接続など外部依存のチェックはReadiness
                                    Probeに任せる。Liveness
                                    Probeが外部依存の障害で失敗すると、無意味な再起動ループを引き起こす。
                                </li>
                                <li>
                                    Startup Probeを使わずに長いLiveness
                                    Probeの<code>initialDelaySeconds</code>だけに頼ると、起動の遅いアプリと本当にハングしたアプリを区別できない。起動時間が不安定なアプリには必ずStartup
                                    Probeを設定する。
                                </li>
                                <li>
                                    <code>preStop</code>
                                    フックの遅延（数秒のsleep等）は、エンドポイントやロードバランサーからPodが実際に切り離されるまでの猶予を確認するものではない。安全にドレインするには、遅延に加えて（1）遅延とアプリの終了処理を収容できる<code>terminationGracePeriodSeconds</code>、（2）新規接続を止めて処理中のリクエストを完了させるアプリ側のグレースフルシャットダウン、（3）利用中のロードバランサー実装ごとの切り離し所要時間の実測と検証、の3点をそろえる必要がある。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="2-3">2.3 名前空間・ラベル・アノテーションによる整理（原著第7章）</h3>
                    <p>
                        <strong>Namespace</strong>
                        はクラスタ内のリソースを論理的に分割する仕組みです。ただし原著7.1.4節が明確に警告する通り、Namespaceは<strong>ネットワーク的な隔離を提供しません</strong>（NetworkPolicyなど別の仕組みと組み合わせない限り、異なるNamespace間のPodは自由に通信できます）。
                    </p>
                    <Diagram id="diag-14" label="クラスタ内のNamespace分割とNetworkPolicyによるネットワーク隔離関係" />
                    <p>
                        <strong>ラベルとラベルセレクタ（原著7.2〜7.3節）</strong>
                        は、Kubernetesにおけるオブジェクトのグルーピングの基本メカニズムです。Service、ReplicaSet、Deploymentなど、多くのコントローラがラベルセレクタで「どのPodを対象にするか」を決定します。
                    </p>
                    <Diagram id="diag-15" label="ラベルとラベルセレクタによるPodのフィルタリング対応図" />
                    <p>
                        アノテーション（原著7.5節）はラベルと似ていますが、セレクタの対象にはならず、任意の（非識別用途の）メタデータ（ビルド情報、ツール固有の設定値など）を格納するために使います。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    Kubernetes公式が定める
                                    <a href="https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/">
                                        推奨ラベル
                                    </a>
                                    （<code>app.kubernetes.io/name</code>、<code>app.kubernetes.io/version</code>など）に準拠し、ツール間の相互運用性を高める。
                                </li>
                                <li>
                                    Namespace単位でResourceQuota・LimitRangeを設定し、1チーム／1環境がクラスタ全体のリソースを食い潰さないようにする。
                                </li>
                                <li>
                                    機密性の高いワークロード同士は同一Namespaceであっても信頼せず、NetworkPolicyでデフォルト拒否（default-deny）を基本方針にする。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />

                    <h2 id="part3">
                        第3部: アプリケーションの設定とストレージ（原著Part 3: 第8〜10章）
                    </h2>
                    <h3 id="3-1">3.1 ConfigMapとSecret（原著第8章）</h3>
                    <p>
                        コンテナイメージから設定を分離する（Twelve-Factor
                        Appの原則）ために、KubernetesはConfigMap（機密でない設定値）とSecret（機密データ）という2種類のオブジェクトを提供します。
                    </p>
                    <Diagram id="diag-16" label="ConfigMapとSecretを環境変数やボリュームとしてPodへ注入する仕組み" />
                    <p>
                        原著8.3.4節「Understanding why Secrets aren&apos;t always
                        secure」は初学者が誤解しがちな重要ポイントです。SecretはデフォルトではBase64エンコードされているだけで<strong>暗号化されていません</strong>。etcdへの保存時に暗号化する（Encryption
                        at
                        Rest）よう明示的に設定しない限り、etcdへのアクセス権限があれば誰でも復号できてしまいます。
                    </p>
                    <Diagram id="diag-17" label="Secretのetcd暗号化（Encryption at Rest）有効/無効によるセキュリティ差" />
                    <p>
                        <strong>Downward API（原著8.4節）</strong>
                        は、Pod自身のメタデータ（名前、Namespace、ラベル、リソース制限値など）をコンテナ内の環境変数やファイルとして注入する仕組みです。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    SecretはetcdのEncryption at
                                    Restを有効化し、加えて可能であればHashiCorp VaultやAWS Secrets
                                    Manager、External Secrets
                                    Operatorなど外部シークレット管理システムとの連携を検討する。
                                </li>
                                <li>
                                    ConfigMap/Secretを更新しても、既に起動済みのPodへの環境変数注入は自動反映されない（再起動が必要）。ボリュームマウントの場合は多くのケースで自動的にファイル内容が更新されるが、アプリ側がファイル変更を検知して再読み込みする実装になっているか確認する。
                                </li>
                                <li>
                                    Secretの中身をGitリポジトリに平文でコミットしない。Sealed
                                    SecretsやSOPS、External Secrets
                                    Operatorなどでの暗号化管理をGitOpsパイプラインに組み込む。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="3-2">3.2 ボリューム（原著第9章）</h3>
                    <p>
                        Kubernetesの<strong>ボリューム</strong>は、コンテナのファイルシステムより長生きするストレージ（少なくともPodのライフサイクル分）を提供します。
                    </p>
                    <Diagram id="diag-18" label="emptyDirやhostPath、image volume等主要なボリューム種別の一覧図" />
                    <p>
                        <code>emptyDir</code>
                        はPodが削除されると内容も消える一時ボリュームで、コンテナ間のファイル共有（例:
                        メインコンテナが書いたログをサイドカーが読む）によく使われます。一方<code>hostPath</code>はノードのローカルディスクに直接アクセスするため、Pod再スケジュール時にデータの整合性が保てず、セキュリティリスクも高いため、原著でも「特別な用途（DaemonSetでノード上のログファイルを読むなど）に限定すべき」と位置づけられています。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    <code>hostPath</code>はノード固有のリソース（例:
                                    DaemonSetからホストのログファイルを読み取り専用でマウントする）以外では避け、一般的なアプリケーションの永続化にはPersistentVolume（3.3節）を使う。
                                </li>
                                <li>
                                    複数のConfigMap/Secret/DownwardAPIを1つのマウントポイントに統合したい場合は<code>projected</code>ボリュームを使い、Podのボリューム定義をシンプルに保つ。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="3-3">3.3 PersistentVolumeによる永続化（原著第10章）</h3>
                    <p>
                        Pod自体は使い捨て（ephemeral）ですが、データベースなどのステートフルなワークロードにはPodのライフサイクルを超えて存続するストレージが必要です。Kubernetesはこれを<strong>PersistentVolume（PV）</strong>と<strong>PersistentVolumeClaim（PVC）</strong>という2つのオブジェクトで抽象化します。
                    </p>
                    <Diagram id="diag-19" label="開発者・PVC・StorageClass・CSI・PV・Podによるストレージ動的確保シーケンス" />
                    <p>
                        <strong>アクセスモード（原著10.2.4節）</strong>
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">アクセスモード</th>
                                    <th scope="col">略称</th>
                                    <th scope="col">意味</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ReadWriteOnce</td>
                                    <td>RWO</td>
                                    <td>単一ノードから読み書き可能</td>
                                </tr>
                                <tr className="even">
                                    <td>ReadOnlyMany</td>
                                    <td>ROX</td>
                                    <td>複数ノードから読み取り専用でマウント可能</td>
                                </tr>
                                <tr className="odd">
                                    <td>ReadWriteMany</td>
                                    <td>RWX</td>
                                    <td>複数ノードから同時に読み書き可能</td>
                                </tr>
                                <tr className="even">
                                    <td>ReadWriteOncePod</td>
                                    <td>RWOP</td>
                                    <td>単一Podからのみ読み書き可能（1.29でGA、より厳格な排他制御）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>StorageClassとCSIドライバ（原著10.2.5〜10.2.6節）</strong>
                        は、クラウドプロバイダやストレージベンダーごとの実装差異を吸収する仕組みです。StorageClassを指定するだけで、背後のCSI（Container
                        Storage Interface）ドライバが実際のディスクをプロビジョニングします。
                    </p>
                    <p>
                        <strong>静的プロビジョニング vs 動的プロビジョニング（原著10.1.2節）</strong>
                    </p>
                    <Diagram id="diag-20" label="動的プロビジョニングと静的プロビジョニングの比較図" />
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    特別な理由がない限り動的プロビジョニング（StorageClass +
                                    PVC）を使い、静的プロビジョニングはノードローカルストレージなど特殊なケースに限定する。
                                </li>
                                <li>
                                    PVCのリサイズ（原著10.4.1節）に対応したStorageClass（
                                    <code>allowVolumeExpansion: true</code>
                                    ）を選ぶ。ただしこのフラグは拡張を許可するだけであり、Podを再作成せずにファイルシステムまで広げるには、CSIドライバとファイルシステムの双方がオンライン拡張に対応している必要がある。
                                </li>
                                <li>
                                    定期的なスナップショット（原著10.4.2〜10.4.3節）をVolumeSnapshotリソースで自動化し、災害復旧（DR）計画に組み込む。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <h2 id="part4">第4部: アプリケーションの接続と公開（原著Part 4: 第11〜13章）</h2>
                    <h3 id="4-1">4.1 Service（原著第11章）</h3>
                    <p>
                        Podは再作成されるたびにIPアドレスが変わるため、Podに直接依存した通信は成立しません。<strong>Service</strong>は、ラベルセレクタにマッチするPod群への安定したアクセス経路（仮想IP
                        + DNS名）を提供します。
                    </p>
                    <Diagram id="diag-21" label="Service・EndpointSlice・Pod群の接続関係図" />
                    <p><strong>Serviceの種類（原著11.1〜11.2節）</strong></p>
                    <Diagram id="diag-22" label="Service種別（ClusterIP・LoadBalancer・NodePort）の選定フローチャート" />
                    <p>
                        原著11.4.2節の<strong>ヘッドレスサービス</strong>（<code>clusterIP: None</code>）は、仮想IPを持たずDNSがPod個々のIPを直接返す特殊なServiceで、StatefulSet（5.3節）と組み合わせて各Podに個別のDNS名を割り当てる際に使われます。
                    </p>
                    <p>
                        原著11.5節「Configuring services to route traffic to nearby
                        endpoints」は、大規模クラスタでのレイテンシとコスト最適化に関わる実践的なトピックです。<code>internalTrafficPolicy: Local</code>やTopology Aware
                        Hintsを使うと、可能な限り同一ノード・同一ゾーン内のPodへトラフィックを優先的にルーティングし、ノード間・ゾーン間の通信コストを削減できます。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    Readiness
                                    Probe（2.2節）を必ず設定し、起動途中や過負荷のPodがServiceのエンドポイントに含まれないようにする。
                                </li>
                                <li>
                                    マルチAZ構成のクラスタでは、Topology Aware Routing（旧称Topology
                                    Aware
                                    Hints）を有効化し、ゾーンをまたぐ不要なトラフィックとコストを削減する。
                                </li>
                                <li>
                                    <code>externalTrafficPolicy: Local</code>を使うとクライアントIPを保持できる反面、ノードによって負荷が偏る可能性があるため、ヘルスチェックの設計とセットで検討する。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h3 id="4-2">4.2 Ingress（原著第12章）</h3>
                    <p>
                        <strong>Ingress</strong>は、複数のServiceへのHTTP/HTTPSルーティングを1つのエントリーポイントに集約するAPIです。LoadBalancer
                        Serviceを個々のマイクロサービスごとに用意するとクラウドの課金・IP管理コストが増大するため、Ingressで一元化するのが一般的です。
                    </p>
                    <Diagram id="diag-23" label="クライアント・LB・Ingressコントローラ・Service間のトラフィック経路図" />
                    <p>
                        重要なのは、原著12.1.2節が明記する通り、<strong>Ingressオブジェクトそのものはルーティングを実行しません</strong>。実際にトラフィックを処理するのは別途デプロイする<strong>Ingressコントローラ</strong>（NGINX
                        Ingress
                        Controller、Traefik、HAProxy等）です。Ingressオブジェクトはコントローラに対する「設定の宣言」に過ぎません。
                    </p>
                    <p>
                        2026年時点で特に重要なのは、コミュニティ版<strong>Ingress-NGINX Controller</strong>が終了に向かっているという点です。詳細は<a href="#6-4">6.4節</a>で扱いますが、原著12章の内容自体は今も有効な一方、これから新規にIngressコントローラを選定する場合はGateway
                        API（4.3節）への移行を前提に計画することが強く推奨されています。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス（原著12.4節）</div>
                            <ul>
                                <li>
                                    Ingressアノテーションはコントローラ実装ごとに非互換であるため（例:
                                    NGINX用のアノテーションはTraefikでは動かない）、複数コントローラの並行運用や移行を想定する場合は特に注意する。
                                </li>
                                <li>
                                    TLS証明書の自動更新にはcert-managerを併用し、証明書の手動更新運用を排除する。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h3 id="4-3">4.3 Gateway API（原著第13章）</h3>
                    <p>
                        <strong>Gateway API</strong>は、Ingressの後継として設計された、より表現力の高いL4/L7トラフィックルーティングAPI群です。原著第2版で新規に追加された第13章がまるまる1章を割いて解説しているのは、Gateway
                        APIが2026年時点のKubernetesネットワーキングにおける事実上の標準になりつつあることの裏返しです。
                    </p>
                    <Diagram id="diag-24" label="GatewayClass・Gateway・HTTPRouteのロール別リソース分離図" />
                    <p>
                        Ingressとの決定的な違いは、この<strong>ロールベースの権限分離</strong>です。Ingressでは1つのオブジェクトに全ての設定が混在するため、アプリチームがインフラ設定まで触れてしまう、あるいは逆にインフラチームがボトルネックになるという課題がありました。Gateway
                        APIはGatewayClass（インフラ提供者）・Gateway（クラスタ運用者）・Route（HTTPRouteなど、アプリチーム）の3層に権限を分割します。
                    </p>
                    <p><strong>IngressとGateway APIの比較</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">観点</th>
                                    <th scope="col">Ingress</th>
                                    <th scope="col">Gateway API</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>設定の分離</td>
                                    <td>1オブジェクトに集約</td>
                                    <td>GatewayClass/Gateway/Routeに分離</td>
                                </tr>
                                <tr className="even">
                                    <td>プロトコル対応</td>
                                    <td>実質HTTP/HTTPSのみ</td>
                                    <td>HTTP, gRPC, TCP, UDP, TLS(pass-through)に対応</td>
                                </tr>
                                <tr className="odd">
                                    <td>ベンダー拡張の方法</td>
                                    <td>非互換なアノテーション</td>
                                    <td>標準化されたフィルタ・ポリシーアタッチメント</td>
                                </tr>
                                <tr className="even">
                                    <td>トラフィック分割</td>
                                    <td>コントローラ依存の独自拡張</td>
                                    <td><code>HTTPRoute</code>のweight指定で標準的にサポート</td>
                                </tr>
                                <tr className="odd">
                                    <td>2026年時点の位置づけ</td>
                                    <td>機能凍結（feature-frozen）</td>
                                    <td>積極的に開発が続く標準API</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-25" label="HTTPRouteによる重みづけトラフィック分割例" />
                    <p>
                        原著13.7節「From ingress gateways to service mesh」は、Gateway
                        APIが単なるIngress後継にとどまらず、サービスメッシュ（東西トラフィック）まで統一的にモデル化しようとする方向性（GAMMA
                        Initiative）に触れています。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    新規にKubernetesクラスタでHTTPルーティングを構築する場合は、原著13.1.3節が例示するIstioに限らず、Envoy
                                    Gateway・Cilium・クラウドマネージドのGateway API実装（GKE
                                    Gateway、AWS Gateway API
                                    Controllerなど）の中から要件に合うものを選び、最初からGateway
                                    APIで構築する。
                                </li>
                                <li>
                                    既存のIngressからの移行は、<code>ingress2gateway</code>のような変換ツールで叩き台を生成した上で、アノテーションに依存していた挙動を手動で<code>HTTPRoute</code>のフィルタ機能に置き換える。
                                </li>
                                <li>
                                    GatewayとHTTPRouteをNamespaceで分離する運用（原著13.6節）を活用し、インフラチームがGatewayのTLS設定を管理しつつ、アプリチームは自Namespace内のHTTPRouteだけを変更できるようにする。Namespace分離は書き込み権限の分離とセットで設計する。すなわち、<code>gateways</code>リソースへの<code>create</code>/<code>update</code>/<code>patch</code>/<code>delete</code>はインフラチーム向けのClusterRole（またはGateway用Namespaceに限定したRole）にのみ与え、アプリチームには自Namespaceの<code>httproutes</code>に対する権限だけを与えるRole/RoleBindingを各アプリNamespaceに作成する。さらにGateway側の<code>listeners[].allowedRoutes</code>（<code>namespaces.from: Selector</code>＋ラベルセレクタなど）で接続を許可するNamespaceを明示的に絞り込み、クロスNamespace参照（別NamespaceのSecretやBackendを指すケース）は、対象のKind・Name・送信元Namespaceを限定した<code>ReferenceGrant</code>を参照先Namespaceに置いた場合にのみ許可する。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p>
                        <strong>出典：</strong> Kubernetes SIG Network公式アナウンス「Ingress-NGINX
                        Controller」終了に関するGoogle Open Source Blog (<a
                            href="https://opensource.googleblog.com/2026/02/the-end-of-an-era-transitioning-away-from-ingress-nginx.html"
                            >https://opensource.googleblog.com/2026/02/the-end-of-an-era-transitioning-away-from-ingress-nginx.html</a
                        >)、Gateway API公式リポジトリ (<a
                            href="https://github.com/kubernetes-sigs/gateway-api"
                            >https://github.com/kubernetes-sigs/gateway-api</a
                        >)
                    </p>
                    <hr />
                    <h2 id="part5">
                        第5部: 大規模運用のためのアプリケーション管理（原著Part 5: 第14〜18章）
                    </h2>
                    <h3 id="5-1">5.1 ReplicaSet（原著第14章）</h3>
                    <p>
                        <strong>ReplicaSet</strong>は、指定した数のPodレプリカが常に稼働し続けることを保証するコントローラです。原著14.3.1節が説明する<strong>reconciliation control loop（調整ループ）</strong>は、Kubernetes全体を貫く最重要概念の1つです。
                    </p>
                    <Diagram id="diag-26" label="ReplicaSetのreconciliation control loop（調整ループ）フロー図" />
                    <p>
                        このループは常時（イベント駆動 +
                        定期的な再同期）動き続けており、誰かが手動でPodを削除しても、ReplicaSetが即座に代わりのPodを作成します。原著14.1.3節「Understanding
                        pod
                        ownership」では、<code>ownerReferences</code>フィールドによってPodがどのReplicaSetに所属するかが管理されている点を解説しています。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    通常、ReplicaSetを直接作成することは稀で、後述のDeploymentが内部的にReplicaSetを管理する。ReplicaSetを直接操作するのは、ローリングアップデートの仕組みを理解する学習目的か、非常に特殊な運用ニーズに限られる。
                                </li>
                                <li>
                                    <code>kubectl delete replicaset --cascade=orphan</code>を使えば、ReplicaSetだけを削除してPodを残すことができる（原著14.4.2節）。緊急時の切り離し手段として覚えておく。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h3 id="5-2">5.2 Deployment（原著第15章）</h3>
                    <p>
                        <strong>Deployment</strong>はReplicaSetをさらにラップし、宣言的なローリングアップデート・ロールバックを可能にするコントローラです。実務でステートレスアプリケーションをデプロイする際、最も頻繁に使うオブジェクトです。
                    </p>
                    <Diagram id="diag-27" label="Deploymentによる新旧ReplicaSetおよびPodの管理構造図" />
                    <p><strong>更新戦略（原著15.2節）</strong></p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">戦略</th>
                                    <th scope="col">挙動</th>
                                    <th scope="col">ダウンタイム</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Recreate</td>
                                    <td>旧Podを全て削除してから新Podを作成</td>
                                    <td>あり</td>
                                </tr>
                                <tr className="even">
                                    <td>RollingUpdate（既定）</td>
                                    <td>新旧Podを段階的に入れ替える</td>
                                    <td>なし（正しく設定すれば）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-28" label="Deploymentローリングアップデートのシーケンス図（maxUnavailable: 0の場合）" />
                    <p>
                        上図は<code>maxUnavailable: 0</code>（可用性最優先）の場合の順序です。<code>maxUnavailable</code>が0より大きい場合は、新Podのreadyを待たずに先に旧ReplicaSetを縮小できます。つまり「増やしてから減らす」か「減らしてから増やす」かは<code>maxSurge</code>と<code>maxUnavailable</code>の設定で変わります（<code>maxSurge: 0</code>の場合は縮小が先行します）。
                    </p>
                    <p><strong>その他のデプロイ戦略（原著15.3節）</strong></p>
                    <p>
                        原著15.3節は、Deploymentのビルトイン機能を超えた高度なデプロイパターンを紹介しています。これらはDeployment単体では実現できず、Service重みづけやサービスメッシュ、あるいはArgo
                        RolloutsのようなCRDベースのツールと組み合わせて実現します。
                    </p>
                    <Diagram id="diag-29" label="カナリア・A/Bテスト・Blue/Green・シャドウイング等デプロイ戦略の比較図" />
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    <code>maxUnavailable</code>と<code>maxSurge</code>は、可用性重視なら<code>maxUnavailable: 0</code>、リソース制約が厳しいなら<code>maxSurge: 0</code>のように、クラスタのリソース余裕とSLAに応じて調整する。
                                </li>
                                <li>
                                    Readiness
                                    Probeが正しく設定されていないと、ローリングアップデート中に「まだ準備できていない新Pod」にトラフィックが流れ、実質的なダウンタイムを引き起こす。Deploymentの安全なローリングアップデートはReadiness
                                    Probeとセットで初めて成立する。
                                </li>
                                <li>
                                    <code>kubectl rollout undo</code>で即座にロールバックできるよう、<code>revisionHistoryLimit</code>で保持するReplicaSet履歴数を意図的に設定しておく。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h3 id="5-3">5.3 StatefulSet（原著第16章）</h3>
                    <p>
                        Deploymentが管理するPodは互換性があり順不同（interchangeable）であるのに対し、<strong>StatefulSet</strong>はデータベースのようにPodごとに固有のアイデンティティ（安定したネットワーク識別子・専用の永続ストレージ）が必要なワークロード向けのコントローラです。
                    </p>
                    <Diagram id="diag-30" label="StatefulSetとヘッドレスService、順序付きPod・PVCの構成図" />
                    <p><strong>StatefulSetの3つの特性（原著16.1.1節）</strong></p>
                    <ol>
                        <li>
                            <strong>安定したネットワークID</strong>:
                            各Podは<code>&lt;statefulset名&gt;-&lt;序数&gt;</code>という固定名を持ち、ヘッドレスServiceを通じて<code>&lt;pod名&gt;.&lt;service名&gt;</code>という固定DNS名でアクセスできる。
                        </li>
                        <li>
                            <strong>安定した永続ストレージ</strong>:
                            各Podは専用のPVCを持ち、Podが再作成されても同じPVC（＝同じデータ）に再アタッチされる。
                        </li>
                        <li>
                            <strong>順序保証</strong>:
                            既定では<code>OrderedReady</code>ポリシーにより、Pod-0が起動・Readyになってから
                            Pod-1が起動する（スケールアップ・ダウンとも順序を守る）。
                        </li>
                    </ol>
                    <Diagram id="diag-31" label="StatefulSetにおけるPodの順序付き起動（OrderedReady）フロー図" />
                    <p>
                        原著16.4節では、MongoDB Community Operatorを例に<strong>Kubernetes Operator</strong>パターンを紹介しています。OperatorはStatefulSetをさらに一段抽象化し、「レプリカセットの初期化」「フェイルオーバー」「バックアップ」のようなアプリケーション固有の運用知識をコントローラとしてコード化したものです。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    本番のステートフルワークロード（データベース等）は、可能な限り実績のあるOperator（PostgreSQLのCloudNativePG、MongoDBのCommunity/Enterprise
                                    Operatorなど）を使い、StatefulSetを手で運用する範囲を最小化する。
                                </li>
                                <li>
                                    PVC保持ポリシー（原著16.2.4節、<code>persistentVolumeClaimRetentionPolicy</code>）を明示的に設定し、StatefulSet削除時にPVCを残すか削除するかを意図した挙動にする。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h3 id="5-4">5.4 DaemonSet（原著第17章）</h3>
                    <p>
                        <strong>DaemonSet</strong>は、クラスタ内の（条件に合う）全ノードにちょうど1つのPodを配置するコントローラです。ログ収集エージェント、ノードモニタリングエージェント、CNIプラグインなど、ノード単位で常駐すべきインフラコンポーネントに使われます。
                    </p>
                    <Diagram id="diag-32" label="DaemonSetによる各ノードへのPod自動配置構造図" />
                    <p>
                        原著17.2節では、DaemonSetのPodがしばしば必要とする特別な権限（ホストネットワークの利用、ノードファイルシステムへのアクセス、OSカーネルへのアクセス）を扱っています。これらは通常のアプリケーションPodには不要かつ危険な権限であるため、DaemonSet専用の設計判断として明確に区別することが重要です。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    DaemonSetは<code>nodeSelector</code>や<code>tolerations</code>と組み合わせ、コントロールプレーンノードを含む全ノードに配置すべきか、特定ラベルを持つノードに限定すべきかを明示的に設計する。
                                </li>
                                <li>
                                    ノードエージェントに<code>hostNetwork: true</code>や特権コンテナ（<code>privileged: true</code>）が必要な場合は、その理由をコメントで明記し、Pod Security
                                    Admissionのポリシーで許可範囲を最小化する。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h3 id="5-5">5.5 JobとCronJob（原著第18章）</h3>
                    <p>
                        <strong>Job</strong>は「完了」という概念を持つワークロード（バッチ処理、データマイグレーションなど）向けのコントローラです。Deployment/ReplicaSetが「常に一定数のPodを稼働させ続ける」のに対し、Jobは「指定回数の正常終了」を目標にします。
                    </p>
                    <Diagram id="diag-33" label="Jobコントローラによる並行実行と正常終了カウントの管理図" />
                    <p>
                        <strong>CronJob</strong>はJobをスケジュール実行するためのラッパーで、Unix
                        cron形式のスケジュール文字列（例:
                        <code>0 2 * * *</code>＝毎日2時）でJobを定期生成します。
                    </p>
                    <Diagram id="diag-34" label="CronJobによるJobおよびPodの定期スケジュール生成フロー図" />
                    <p>
                        原著18.2.5〜18.2.6節では、<code>startingDeadlineSeconds</code>（コントロールプレーンの一時停止などでスケジュールを逃した場合の許容遅延）と<code>concurrencyPolicy</code>（前回のJobが終わっていない場合の挙動:
                        <code>Allow</code>/<code>Forbid</code>/<code>Replace</code>）という、実運用で必ず遭遇する設定を扱っています。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">&#10003;</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    冪等でないバッチ処理（重複実行が許されない処理）には<code>concurrencyPolicy: Forbid</code>を設定し、前回のJobが完了する前に新しいJobが起動しないようにする。ただし<code>Forbid</code>はスケジュール時点の同時実行を抑止するだけで、重複実行を根本的に防ぐものではない（Jobコントローラの再試行やPodの再スケジュールにより、同じ処理が複数回走ることはある）。また実行中のJobがあるとその回のスケジュールはスキップされるため、実行の欠落も起こりうる。重複が許容できない処理は、処理自体を冪等に設計するか、外部ストア上の重複排除キー（実行IDによる排他ロックや一意制約）で二重実行を弾く仕組みを実装する。
                                </li>
                                <li>
                                    <code>activeDeadlineSeconds</code>でJobの最大実行時間を設定し、ハングしたバッチ処理がリソースを専有し続けるのを防ぐ。
                                </li>
                                <li>
                                    <code>ttlSecondsAfterFinished</code>（原著18.2.4節）を設定し、完了済みJob/Podがクラスタに溜まり続けてAPIサーバーやetcdの負荷にならないようにする。
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
