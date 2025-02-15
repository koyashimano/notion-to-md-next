export default function TermsPage() {
  return (
    <div className="h-full overflow-y-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">利用規約</h1>

      <h2 className="mb-2 text-xl font-semibold">第1条（適用）</h2>
      <p className="mb-4">
        本利用規約（以下「本規約」といいます）は、当社が提供する本ウェブサイトおよびそのサービス（以下「本サービス」といいます）の利用に関する条件を定めるものです。ユーザーは、本サービスを利用することにより、本規約に同意したものとみなされます。
      </p>

      <h2 className="mb-2 text-xl font-semibold">
        第2条（アカウントおよび登録情報）
      </h2>
      <ol className="mb-4 list-inside list-decimal">
        <li>
          ユーザーは、本サービスの利用にあたり、真実、正確かつ完全な情報を提供しなければなりません。
        </li>
        <li>
          ユーザーは、登録情報に変更があった場合、速やかに当該情報を更新するものとします。
        </li>
        <li>
          ユーザーは、自己のアカウントの管理について責任を負い、アカウントの不正使用により生じた一切の損害について責任を負うものとします。
        </li>
        <li>
          当社は、登録情報の内容が事実と異なる場合、またはその可能性が高いと判断した場合、当該アカウントの利用を停止または削除することができます。
        </li>
      </ol>

      <h2 className="mb-2 text-xl font-semibold">第3条（サービスの提供）</h2>
      <ol className="mb-4 list-inside list-decimal">
        <li>
          当社は、本サービスの内容を予告なく変更、追加、停止または中止することができます。
        </li>
        <li>
          当社は、以下の場合には本サービスの全部または一部の提供を停止することができます。
          <ul className="ml-4 list-inside list-disc">
            <li>システムの保守、点検または更新を行う場合</li>
            <li>
              地震、火災、停電、天災地変などの不可抗力により本サービスの提供が困難となった場合
            </li>
            <li>その他、当社が必要と判断した場合</li>
          </ul>
        </li>
        <li>
          前項の措置により生じたユーザーの損害について、当社は一切の責任を負わないものとします。
        </li>
      </ol>

      <h2 className="mb-2 text-xl font-semibold">第4条（禁止事項）</h2>
      <p className="mb-2">
        ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。
      </p>
      <div className="mb-4">
        <ul className="list-inside list-disc">
          <li>法令、本規約もしくは公序良俗に違反する行為</li>
          <li>
            当社または第三者の知的財産権、プライバシー権、名誉権その他の権利を侵害する行為
          </li>
          <li>
            本サービスのネットワークまたはシステムに過度の負荷をかける行為
          </li>
          <li>本サービスの不具合を意図的に利用する行為</li>
          <li>本サービスに関連して不正な利益を得る行為</li>
          <li>他のユーザーの本サービスの利用を妨害する行為</li>
          <li>反社会的勢力等への利益供与</li>
          <li>その他、当社が不適切と判断する行為</li>
        </ul>
      </div>

      <h2 className="mb-2 text-xl font-semibold">第5条（免責事項）</h2>
      <ol className="mb-4 list-inside list-decimal">
        <li>
          当社は、本サービスの内容および本サービスを通じて提供される情報の正確性、信頼性、完全性、有用性について、いかなる保証も行いません。
        </li>
        <li>
          当社は、本サービスの利用に関連してユーザーが被った損害について、当社の故意または重大な過失による場合を除き、一切の責任を負わないものとします。
        </li>
        <li>
          当社は、ユーザーと他のユーザーまたは第三者との間で生じた紛争について、一切の責任を負わないものとします。
        </li>
        <li>
          本サービスは、Notion
          APIを含む外部サービスと連携していますが、これらの外部サービスの停止、仕様変更等により本サービスの機能が制限される場合があります。
        </li>
      </ol>

      <h2 className="mb-2 text-xl font-semibold">第6条（知的財産権）</h2>
      <ol className="mb-4 list-inside list-decimal">
        <li>
          本サービスに関する著作権、商標権等の知的財産権は、当社または正当な権利を有する第三者に帰属します。
        </li>
        <li>
          ユーザーは、当社の書面による事前の承諾なく、本サービスに関する知的財産権を使用、複製、転載、改変、送信等することはできません。
        </li>
        <li>
          ユーザーが本サービスに投稿したコンテンツの知的財産権は、ユーザーに帰属します。ただし、ユーザーは当社に対し、当該コンテンツを本サービスの提供、改善および宣伝広告に利用する権利（サブライセンス権を含みます）を無償で許諾するものとします。
        </li>
      </ol>

      <h2 className="mb-2 text-xl font-semibold">第7条（利用規約の変更）</h2>
      <ol className="mb-4 list-inside list-decimal">
        <li>当社は、本規約を随時変更できるものとします。</li>
        <li>
          変更後の本規約は、当社が別途定める場合を除き、本サービス上に表示した時点より効力を生じるものとします。
        </li>
        <li>
          ユーザーは、変更後の本規約に同意できない場合には、直ちに本サービスの利用を中止するものとします。本規約の変更後も本サービスの利用を継続する場合、ユーザーは変更後の本規約に同意したものとみなされます。
        </li>
      </ol>

      <h2 className="mb-2 text-xl font-semibold">
        第8条（準拠法および管轄裁判所）
      </h2>
      <ol className="mb-4 list-inside list-decimal">
        <li>本規約の解釈および適用は、日本法に準拠するものとします。</li>
        <li>
          本規約に関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
        </li>
      </ol>
    </div>
  );
}
