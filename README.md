# notion-to-md-next

notion-to-md-next は、NotionページをMarkdown形式に変換し、PDFとしてもエクスポートできるウェブアプリケーションです。 (notion-to-md-next is a web application that allows you to convert Notion pages to Markdown format and also export them as PDF.)

## セットアップ (Setup)

### 依存関係のインストール (Installing Dependencies)

プロジェクトのルートディレクトリで、以下のコマンドを実行して必要なパッケージをインストールします。
(In the project root directory, run the following command to install the necessary packages:)

```bash
npm install
```

### 環境変数 (Environment Variables)

このアプリケーションを実行するには、以下の環境変数を設定した `.env` ファイルをプロジェクトのルートに作成する必要があります。
(To run this application, you need to create a `.env` file in the project root with the following environment variables:)

*   `DATABASE_URL`: PostgreSQLデータベースへの接続文字列。 (Connection string for your PostgreSQL database.)
    *   Example: `postgresql://user:password@host:port/database`
*   `NOTION_CLIENT_ID`: Notion APIのクライアントID。 (Your Notion API Client ID.)
*   `NOTION_CLIENT_SECRET`: Notion APIのクライアントシークレット。 (Your Notion API Client Secret.)
*   `NOTION_REDIRECT_URI`: Notion OAuthリダイレクトURI。 (Your Notion OAuth Redirect URI. This URI must be registered in your Notion integration's settings under "Redirect URIs".)
    *   Example for local development: `http://localhost:3000/api/auth/callback/notion`
*   `NEXTAUTH_SECRET`: NextAuth.jsのセッションを暗号化するためのランダムな文字列。 (A random string used to encrypt NextAuth.js sessions.)
    *   You can generate one using: `openssl rand -base64 32`
*   `NEXTAUTH_URL`: アプリケーションの正規URL。 (The canonical URL of your application.)
    *   Example for local development: `http://localhost:3000`
*   `CHROME_EXECUTABLE_PATH`: (任意) PDFエクスポート機能を利用する場合に、ローカル環境でのGoogle Chrome (またはChromium) の実行可能ファイルへのパスを設定します。Docker環境では通常不要です。
    *   ((Optional) If using the PDF export feature locally, set the path to your Google Chrome (or Chromium) executable. This is typically not required in a Docker environment.)
    *   Example for macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
    *   Example for Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe`
    *   Example for Linux: `/usr/bin/google-chrome`

必ず `.env` ファイルを `.gitignore` に追加して、機密情報がバージョン管理システムにコミットされないようにしてください。
(Make sure to add the `.env` file to your `.gitignore` to prevent committing sensitive information.)

## 主な機能 (Main Features)

### 1. ユーザー認証 (User Authentication)
- **サインアップ (Sign Up):** 新しいユーザーは、メールアドレス、名前、パスワードを使用してアカウントを作成できます。 (New users can create an account using their email address, name, and password.)
- **ログイン (Login):** 登録済みのユーザーは、認証情報を使用してアプリケーションにアクセスできます。 (Registered users can log in to access the application.)

### 2. Notion連携 (Notion Integration)
- アプリケーションがNotionページのコンテンツにアクセスできるようにするには、ユーザーは自分のNotionアカウントを連携させる必要があります。 (Users need to connect their Notion account to allow the application to access their Notion page content.)
- この連携は、NotionのOAuthプロセスを通じて行われます。 (This integration is done via Notion's OAuth process.)

### 3. NotionページをMarkdownへ変換 (Notion Page to Markdown Conversion)
- ユーザーはNotionページのURLを入力することで、そのページの内容をMarkdown形式に変換できます。 (Users can convert their Notion page content into Markdown format by providing the page URL.)
- 変換処理では、テキスト、見出し、リスト、その他基本的なMarkdown要素がサポートされます。(The conversion supports text, headings, lists, and other basic Markdown elements.)

### 4. ダウンロードオプション (Download Options)
- **Markdown (.md):** 変換されたコンテンツは、Markdownファイルとして直接ダウンロードできます。 (The converted content can be downloaded directly as a Markdown file.)
- **PDF (.pdf):** MarkdownコンテンツをPDFファイルとしてエクスポートするオプションも提供されます。この機能は内部でMarkdownをHTMLにレンダリングし、Puppeteerを利用してPDFを生成します。 (An option to export the Markdown content as a PDF file is also provided. This feature renders the Markdown to HTML internally and then uses Puppeteer to generate the PDF.)

## 使い方 (How to Use)

1.  **アカウント登録またはログイン (Sign Up / Login):**
    *   初めて利用する場合は、サインアップページからアカウントを作成してください。 (If you are a new user, create an account from the sign-up page.)
    *   既にアカウントをお持ちの場合は、ログインページからログインしてください。 (If you already have an account, log in from the login page.)

2.  **Notionアカウントを連携 (Connect Your Notion Account):**
    *   初回ログイン後、またはNotion連携がまだの場合は、Notionアカウントとの連携を求めるプロンプトが表示されます。(After your first login, or if your Notion integration is not yet set up, you will be prompted to connect your Notion account.)
    *   画面の指示に従って、アプリケーションにNotionワークスペースへのアクセスを許可してください。 (Follow the on-screen instructions to authorize the application to access your Notion workspace.)

3.  **NotionページURLを入力 (Enter Notion Page URL):**
    *   メインページで、Markdownに変換したいNotionページのURLを入力するフィールドがあります。 (On the main page, you will find a field to enter the URL of the Notion page you want to convert to Markdown.)
    *   有効なNotionページURLを入力し、変換ボタンをクリックします。 (Enter a valid Notion page URL and click the convert button.)

4.  **変換されたMarkdownを確認 (Review Converted Markdown):**
    *   入力されたNotionページの内容がMarkdown形式で画面に表示されます。 (The content of the entered Notion page will be displayed on the screen in Markdown format.)
    *   内容を確認してください。 (Review the content.)

5.  **コンテンツをダウンロード (Download Your Content):**
    *   画面に表示されているダウンロードオプションを使用します。 (Use the download options displayed on the screen.)
    *   **Markdownとして保存 (Save as Markdown):** 「.md」ボタンをクリックすると、変換されたコンテンツがMarkdownファイルとしてダウンロードされます。 (Click the ".md" button to download the converted content as a Markdown file.)
    *   **PDFとして保存 (Save as PDF):** 「.pdf」ボタンをクリックすると、コンテンツがPDFファイルとしてダウンロードされます。 (Click the ".pdf" button to download the content as a PDF file.)

## 開発者向け情報 (For Developers)

### 主な使用技術 (Main Technologies Used)

-   [Next.js](https://nextjs.org/) - Reactフレームワーク (React Framework)
-   [Notion API](https://developers.notion.com/) - Notionとの連携用 (For Notion Integration)
-   [Puppeteer](https://pptr.dev/) - PDF生成用 (For PDF Generation)
-   [NextAuth.js](https://next-auth.js.org/) - 認証用 (For Authentication)
-   [PostgreSQL](https://www.postgresql.org/) - データベース (Database)
-   [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク (CSS Framework)

### 利用可能なスクリプト (Available Scripts)

プロジェクトのルートディレクトリで以下のnpmスクリプトが利用可能です。
(In the project root directory, the following npm scripts are available:)

-   `npm run dev`: 開発モードでアプリケーションを起動します (Starts the application in development mode) (通常 `http://localhost:3000` で利用可能 (Usually available at `http://localhost:3000`))
-   `npm run build`: 本番用にアプリケーションをビルドします (Builds the application for production)
-   `npm run start`: 本番ビルドを起動します (Starts the production build)
-   `npm run lint`: ESLintを実行してコードの静的解析を行います (Runs ESLint for static code analysis)
