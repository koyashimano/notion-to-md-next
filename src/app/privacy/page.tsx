export default function PrivacyPage() {
  return (
    <div className="h-full overflow-y-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">プライバシーポリシー</h1>

      <h2 className="mb-2 text-xl font-semibold">1. 個人情報の取得・収集</h2>
      <ul className="mb-4 list-inside list-disc">
        <li>
          アカウント登録時に入力いただく個人情報（メールアドレス、氏名等）
        </li>
        <li>ユーザー認証に必要なパスワード（暗号化して保管）</li>
        <li>Notion連携時に取得する認証情報（APIトークン等）</li>
        <li>
          サービスの運営・改善、不正アクセス防止等に必要なログ情報（アクセス日時、IPアドレス等）
        </li>
      </ul>

      <h2 className="mb-2 text-xl font-semibold">2. 利用目的</h2>
      <ul className="mb-4 list-inside list-disc">
        <li>本サービスにおけるユーザー認証およびアカウント管理</li>
        <li>Notion連携機能の提供および関連するデータの処理</li>
        <li>不正アクセスの検知および防止</li>
        <li>サービスの品質向上、機能改善、システムの保守・管理</li>
        <li>法令等に基づく開示請求への対応</li>
      </ul>

      <h2 className="mb-2 text-xl font-semibold">3. 個人情報の第三者提供</h2>
      <p className="mb-4">
        当社は、以下のいずれかに該当する場合を除き、個人情報を第三者に提供いたしません：
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>ユーザーの同意がある場合</li>
        <li>法令に基づく場合</li>
        <li>人の生命、身体または財産の保護のために必要がある場合</li>
        <li>
          公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合
        </li>
      </ul>

      <h2 className="mb-2 text-xl font-semibold">4. セキュリティ対策</h2>
      <p className="mb-4">
        当社は、個人情報の漏洩、滅失、毀損等を防止するため、以下の安全管理措置を講じています：
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>個人情報への適切なアクセス制御</li>
        <li>パスワード等の重要情報の暗号化</li>
        <li>NotionのAPIトークン等の機密情報の厳重な管理</li>
        <li>定期的なセキュリティ監査の実施</li>
      </ul>

      <h2 className="mb-2 text-xl font-semibold">5. Cookieの使用について</h2>
      <p className="mb-4">
        当サービスでは、ユーザー体験の向上および必要な機能の提供のため、Cookieを使用しています。これには以下の目的が含まれます：
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>ログイン状態の維持</li>
        <li>セッション管理</li>
        <li>利用状況の分析</li>
      </ul>
      <p className="mb-4">
        なお、ブラウザの設定によりCookieの使用を制限することが可能ですが、一部機能が利用できなくなる場合があります。
      </p>

      <h2 className="mb-2 text-xl font-semibold">6. 外部サービスとの連携</h2>
      <p className="mb-4">
        当サービスはNotion
        APIを始めとする外部サービスと連携しています。外部サービスにおける個人情報の取り扱いについては、各サービスのプライバシーポリシーが適用されます。外部サービスをご利用の際は、各サービスのプライバシーポリシーをご確認ください。
      </p>

      <h2 className="mb-2 text-xl font-semibold">7. 個人情報の保持期間</h2>
      <p className="mb-4">
        個人情報の保持期間は、以下の期間のうち、いずれか早い時点までとします：
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>ユーザーによるアカウント削除時</li>
        <li>当サービスの提供終了時</li>
        <li>利用目的が達成された時</li>
      </ul>
      <p className="mb-4">
        ただし、法令等により保持が必要な場合は、この限りではありません。
      </p>

      <h2 className="mb-2 text-xl font-semibold">
        8. プライバシーポリシーの改定
      </h2>
      <p className="mb-4">
        当社は、法令変更への対応または当サービスの変更等の理由により、本プライバシーポリシーを改定する場合があります。重要な変更がある場合は、当サービス上で通知いたします。変更後のプライバシーポリシーは、当サービス上に掲載した時点で効力を生じるものとします。
      </p>

      <h2 className="mb-2 text-xl font-semibold">9. お問い合わせ窓口</h2>
      <p className="mb-4">
        本プライバシーポリシーに関するお問い合わせは、以下の方法にて承ります：
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <a
            href="https://github.com/koyashimano/notion-to-md-next"
            className="text-blue-500"
          >
            GitHubリポジトリ
          </a>
          上のIssue
        </li>
      </ul>
    </div>
  );
}
