import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs19を全文・順序どおり収録。 */
export function S19() { return <>
<h2 id="s19" tabIndex={-1}>{"Step 15：IaC テンプレートの実装とデプロイ（Skill 3.3.4）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.3.4"}</strong>{": Infrastructure as Code（IaC）テンプレートを実装・デプロイする（例：AWS SAM テンプレート、AWS CloudFormation テンプレート）"}</p>{" "}</blockquote>
{" "}
<h3>{"15.1 IaC を使う理由"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 53">
<table>

<thead>

<tr>

<th scope="col">{"手作業（コンソール操作）"}</th>

<th scope="col">{"IaC（コードで定義）"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"手順が人の記憶頼み"}</td>

<td><strong>{"テンプレートが手順書そのもの"}</strong></td>

</tr>

<tr>

<td>{"環境ごとに微妙に違う"}</td>

<td><strong>{"同じテンプレートから同じ環境"}</strong>{" を何度でも作れる"}</td>

</tr>

<tr>

<td>{"変更履歴が残らない"}</td>

<td><strong>{"Git で差分レビュー・履歴管理"}</strong></td>

</tr>

<tr>

<td>{"削除漏れが出る"}</td>

<td><strong>{"スタック削除で関連リソースをまとめて削除"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"15.2 CloudFormation と SAM の関係"}</h3>
{" "}
<p><strong>{"AWS SAM は CloudFormation の拡張"}</strong>{" です。SAM テンプレートの先頭に "}<code>{"Transform: AWS::Serverless-2016-10-31"}</code>{" と書くと、デプロイ時に "}<strong>{"通常の CloudFormation テンプレートへ展開"}</strong>{" されます。"}</p>
{" "}
<Diagram id="d25" label="Step 15：IaC テンプレートの実装とデプロイ（Skill 3.3.4）の図解 d25" />
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 54">
<table>

<thead>

<tr>

<th scope="col">{"比較項目"}</th>

<th scope="col">{"CloudFormation"}</th>

<th scope="col">{"AWS SAM"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"対象"}</td>

<td>{"AWS のほぼ全リソース"}</td>

<td>{"サーバーレス向けに簡略化（Lambda、API、テーブル等）"}</td>

</tr>

<tr>

<td>{"記述量"}</td>

<td>{"多い"}</td>

<td><strong>{"少ない"}</strong>{"（IAM ロールや API を自動生成）"}</td>

</tr>

<tr>

<td>{"ローカルテスト"}</td>

<td>{"なし"}</td>

<td><code>{"sam local"}</code>{"（Docker）"}</td>

</tr>

<tr>

<td>{"段階的デプロイ"}</td>

<td>{"別途 CodeDeploy 設定"}</td>

<td><strong><code>{"DeploymentPreference"}</code>{" で簡単に設定"}</strong></td>

</tr>

<tr>

<td>{"併用"}</td>

<td>{"可能（SAM テンプレートに通常の CFN リソースも書ける）"}</td>

<td></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"15.3 テンプレートの構造（セクション）"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 55">
<table>

<thead>

<tr>

<th scope="col">{"セクション"}</th>

<th scope="col">{"必須"}</th>

<th scope="col">{"役割"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"AWSTemplateFormatVersion"}</code></td>

<td>{"任意"}</td>

<td>{"テンプレート形式のバージョン"}</td>

</tr>

<tr>

<td><code>{"Description"}</code></td>

<td>{"任意"}</td>

<td>{"説明"}</td>

</tr>

<tr>

<td><code>{"Metadata"}</code></td>

<td>{"任意"}</td>

<td>{"追加情報"}</td>

</tr>

<tr>

<td><code>{"Parameters"}</code></td>

<td>{"任意"}</td>

<td><strong>{"デプロイ時に外から渡す値"}</strong></td>

</tr>

<tr>

<td><code>{"Rules"}</code></td>

<td>{"任意"}</td>

<td>{"パラメータの組み合わせ検証"}</td>

</tr>

<tr>

<td><code>{"Mappings"}</code></td>

<td>{"任意"}</td>

<td>{"固定の対応表（リージョン別 AMI など）"}</td>

</tr>

<tr>

<td><code>{"Conditions"}</code></td>

<td>{"任意"}</td>

<td>{"条件による作成の切り替え"}</td>

</tr>

<tr>

<td><code>{"Transform"}</code></td>

<td>{"任意"}</td>

<td>{"マクロ（SAM はここで指定）"}</td>

</tr>

<tr>

<td><strong><code>{"Resources"}</code></strong></td>

<td><strong>{"必須"}</strong></td>

<td><strong>{"作成するリソース"}</strong></td>

</tr>

<tr>

<td><code>{"Outputs"}</code></td>

<td>{"任意"}</td>

<td>{"スタックの出力（他スタックから参照可能）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"15.4 よく使う組み込み関数"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 56">
<table>

<thead>

<tr>

<th scope="col">{"関数"}</th>

<th scope="col">{"用途"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"!Ref"}</code></td>

<td>{"パラメータ・リソースの参照"}</td>

<td><code>{"!Ref Stage"}</code></td>

</tr>

<tr>

<td><code>{"!GetAtt"}</code></td>

<td>{"リソースの属性を取得"}</td>

<td><code>{"!GetAtt Table.Arn"}</code></td>

</tr>

<tr>

<td><code>{"!Sub"}</code></td>

<td>{"文字列の変数置換"}</td>

<td><code>{"!Sub \"${AWS::StackName}-fn\""}</code></td>

</tr>

<tr>

<td><code>{"!Join"}</code></td>

<td>{"文字列の連結"}</td>

<td><code>{"!Join [\"-\", [a, b]]"}</code></td>

</tr>

<tr>

<td><code>{"!If"}</code>{" / "}<code>{"!Equals"}</code></td>

<td>{"条件分岐"}</td>

<td><code>{"!If [IsProd, 1024, 256]"}</code></td>

</tr>

<tr>

<td><code>{"!FindInMap"}</code></td>

<td>{"Mappings の参照"}</td>

<td></td>

</tr>

<tr>

<td><code>{"!ImportValue"}</code></td>

<td>{"他スタックの "}<strong>{"Export"}</strong>{" を参照"}</td>

<td></td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"擬似パラメータ："}<code>{"AWS::Region"}</code>{"、"}<code>{"AWS::AccountId"}</code>{"、"}<code>{"AWS::StackName"}</code>{" など。"}</p>
{" "}
<h3>{"15.5 実践：SAM テンプレートの完成例（API + Lambda + DynamoDB）"}</h3>
{" "}
<CodeBlock index={25} language="yaml" lines={["AWSTemplateFormatVersion: '2010-09-09'","Transform: AWS::Serverless-2016-10-31","Description: Orders API","","Parameters:","  Stage:","    Type: String","    Default: dev","    AllowedValues: [dev, staging, prod]","","Globals:","  Function:","    Runtime: python3.13","    Timeout: 10","    MemorySize: 256","","Resources:","  OrdersTable:","    Type: AWS::Serverless::SimpleTable","    DeletionPolicy: Retain              # スタック削除時もテーブルとデータを残す","    Properties:","      PrimaryKey:","        Name: orderId","        Type: String","","  OrderFunction:","    Type: AWS::Serverless::Function","    Properties:","      CodeUri: src/orders/","      Handler: app.handler","      AutoPublishAlias: live            # デプロイごとにバージョン発行＋エイリアス更新","      Environment:","        Variables:","          TABLE_NAME: !Ref OrdersTable","          STAGE: !Ref Stage","      Policies:","        - DynamoDBCrudPolicy:           # SAM のポリシーテンプレート（最小権限）","            TableName: !Ref OrdersTable","      Events:","        PostOrder:","          Type: Api","          Properties:","            Path: /orders","            Method: post","            Auth:","              Authorizer: AWS_IAM       # SigV4 署名付きリクエストのみ許可","","Outputs:","  ApiUrl:","    Description: Invoke URL","    Value: !Sub \"https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/orders\""]} />
{" "}
<blockquote>{" "}<p><code>{"Auth: Authorizer: AWS_IAM"}</code>{" により匿名アクセスは拒否されます（エンドユーザー向けなら Cognito / Lambda オーソライザー）。"}<code>{"DeletionPolicy: Retain"}</code>{" のテーブルは "}<code>{"sam delete"}</code>{" 後も残るため、不要になったら手動で削除してください。"}</p>{" "}<p>{"SAM の "}<code>{"Events: Type: Api"}</code>{" を使うと、暗黙的な REST API（"}<code>{"ServerlessRestApi"}</code>{"）が作られ、既定のステージ名は "}<code>{"Prod"}</code>{" になります。ステージ名を指定したい場合は、前の Step のように "}<code>{"AWS::Serverless::Api"}</code>{" を明示的に定義します。"}</p>{" "}</blockquote>
{" "}
<h3>{"15.6 デプロイの手順（SAM）"}</h3>
{" "}
<Diagram id="d26" label="Step 15：IaC テンプレートの実装とデプロイ（Skill 3.3.4）の図解 d26" />
{" "}
<p>{"CloudFormation を直接使う場合は、"}<strong>{"ローカルのコード（Lambda ソースなど）を S3 にアップロードしてテンプレート内の参照を書き換える"}</strong>{" ため、次の 2 コマンドを使います。"}</p>
{" "}
<CodeBlock index={26} language="bash" lines={["aws cloudformation package \\","  --template-file template.yaml \\","  --s3-bucket my-artifact-bucket \\","  --output-template-file packaged.yaml","","aws cloudformation deploy \\","  --template-file packaged.yaml \\","  --stack-name myapp-dev \\","  --capabilities CAPABILITY_IAM \\","  --parameter-overrides Stage=dev"]} />
{" "}
<h3>{"15.6.1 "}<code>{"CAPABILITY_IAM"}</code>{" とは"}</h3>
{" "}
<p>{"テンプレートが "}<strong>{"IAM ロールなどを作成する場合"}</strong>{"、事故防止のため「それを理解して許可する」という "}<strong>{"明示的な同意"}</strong>{" が必要です。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 57">
<table>

<thead>

<tr>

<th scope="col">{"値"}</th>

<th scope="col">{"場面"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"CAPABILITY_IAM"}</code></td>

<td>{"IAM リソースを作る（名前は自動生成）"}</td>

</tr>

<tr>

<td><code>{"CAPABILITY_NAMED_IAM"}</code></td>

<td><strong>{"名前を指定した"}</strong>{" IAM リソースを作る"}</td>

</tr>

<tr>

<td><code>{"CAPABILITY_AUTO_EXPAND"}</code></td>

<td>{"マクロや "}<strong>{"ネストされたアプリ"}</strong>{" を展開する"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"15.7 AWS CDK（参考）"}</h3>
{" "}
<p><strong>{"AWS CDK"}</strong>{" は TypeScript・Python などの "}<strong>{"プログラミング言語で IaC を書く"}</strong>{" 仕組みです。実行すると CloudFormation テンプレートが生成されます。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 58">
<table>

<thead>

<tr>

<th scope="col">{"コマンド"}</th>

<th scope="col">{"意味"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"cdk bootstrap"}</code></td>

<td>{"初回に、デプロイ用リソース（S3 バケット等）を準備"}</td>

</tr>

<tr>

<td><code>{"cdk synth"}</code></td>

<td>{"CloudFormation テンプレートを生成"}</td>

</tr>

<tr>

<td><code>{"cdk diff"}</code></td>

<td>{"現在のスタックとの差分を表示"}</td>

</tr>

<tr>

<td><code>{"cdk deploy"}</code></td>

<td>{"デプロイ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"15.8 その他の知っておくべき機能"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 59">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"DeletionPolicy"}</strong></td>

<td>{"スタック削除時の扱い："}<code>{"Delete"}</code>{"／"}<code>{"Retain"}</code>{"（残す）／"}<code>{"Snapshot"}</code>{"（スナップショットを残す。RDS・EBS 等）"}</td>

</tr>

<tr>

<td><strong>{"ドリフト検出"}</strong></td>

<td>{"手作業変更などで "}<strong>{"実リソースがテンプレートとずれていないか"}</strong>{" 確認"}</td>

</tr>

<tr>

<td><strong>{"ネストスタック"}</strong></td>

<td>{"大きなテンプレートを部品に分割"}</td>

</tr>

<tr>

<td><strong>{"動的参照"}</strong></td>

<td><code>{"{{resolve:ssm:/path}}"}</code>{"、"}<code>{"{{resolve:secretsmanager:id:SecretString:key}}"}</code>{" で、テンプレートに値を書かず参照"}</td>

</tr>

<tr>

<td><strong>{"cfn-lint"}</strong></td>

<td>{"テンプレートの静的検査"}</td>

</tr>

<tr>

<td><strong>{"ロールバック"}</strong></td>

<td>{"作成・更新の失敗で自動的に元へ戻る（"}<code>{"UPDATE_ROLLBACK_COMPLETE"}</code>{"）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"15.9 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 60">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ベストプラクティス"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td><strong>{"すべてのインフラ変更をテンプレート経由"}</strong>{" にする（手動変更しない）"}</td>

<td>{"ドリフト防止"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><strong>{"Parameters / Conditions"}</strong>{" で環境差分を吸収し、テンプレートを共通化"}</td>

<td>{"保守性"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"リソース名は "}<strong>{"自動生成（名前を固定しない）"}</strong></td>

<td>{"同一テンプレートを複数スタックで使える"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"ステートフルなリソース（DB 等）に "}<code>{"DeletionPolicy: Retain"}</code>{"／Snapshot"}</strong>{" を設定"}</td>

<td>{"誤削除防止"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"機密値は "}<strong>{"動的参照"}</strong>{" で渡し、テンプレートに "}<strong>{"直書きしない"}</strong></td>

<td>{"漏洩防止"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td><code>{"sam validate --lint"}</code>{" / "}<code>{"cfn-lint"}</code>{" を "}<strong>{"CI で実行"}</strong></td>

<td>{"早期検出"}</td>

</tr>

<tr>

<td>{"7"}</td>

<td>{"IAM は "}<strong>{"SAM のポリシーテンプレート等で最小権限"}</strong></td>

<td>{"セキュリティ"}</td>

</tr>

<tr>

<td>{"8"}</td>

<td>{"更新前に "}<strong>{"変更セット"}</strong>{" で影響を確認"}</td>

<td>{"意図しない置換の防止"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"15.10 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 61">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"SAM テンプレートの先頭に必要な記述"}</td>

<td><strong><code>{"Transform: AWS::Serverless-2016-10-31"}</code></strong></td>

</tr>

<tr>

<td>{"CloudFormation テンプレートで必須のセクション"}</td>

<td><strong><code>{"Resources"}</code></strong></td>

</tr>

<tr>

<td>{"ローカルのコードを S3 に上げてテンプレートへ反映"}</td>

<td><strong><code>{"aws cloudformation package"}</code></strong>{"（SAM なら "}<code>{"sam package"}</code>{" / "}<code>{"sam deploy"}</code>{"）"}</td>

</tr>

<tr>

<td>{"IAM ロールを含むスタックの作成でエラー"}</td>

<td><strong><code>{"--capabilities CAPABILITY_IAM"}</code></strong>{" を付ける"}</td>

</tr>

<tr>

<td>{"他スタックの出力値を参照"}</td>

<td><strong>{"Outputs の Export ＋ "}<code>{"Fn::ImportValue"}</code></strong></td>

</tr>

<tr>

<td>{"DB を誤って消したくない"}</td>

<td><strong><code>{"DeletionPolicy: Retain"}</code>{"（または Snapshot）"}</strong></td>

</tr>

<tr>

<td>{"手作業で変更されたかを調べる"}</td>

<td><strong>{"ドリフト検出"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"8 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CloudFormation テンプレートの構造"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/template-anatomy.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"組み込み関数リファレンス"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"DeletionPolicy 属性"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ドリフト検出"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"動的参照"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/dynamic-references.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"AWS SAM とは"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/what-is-sam.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-function.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"SAM の Function リソース"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/sam-resource-function.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/cdk/v2/guide/home.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"AWS CDK 開発者ガイド"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/cdk/v2/guide/home.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
