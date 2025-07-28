# Readme

## Q frontend調査

A
プロジェクトの構造を確認して、フロントエンドの技術スタックと起動手順を調べてみますね。

Read file: frontend/package.json
Read file: frontend/vite.config.ts
Read file: frontend/README.md
確認できました！フロントエンドは確かに**React**で構築されており、Viteを使用した開発環境になっています。

## フロントエンドの技術スタック
- **React 19.1.0** (最新版)
- **TypeScript**
- **Vite** (ビルドツール)
- **Tailwind CSS** (スタイリング)
- **React Router DOM** (ルーティング)

## フロントエンド起動手順

### 1. 依存関係のインストール
```bash
cd frontend
npm install
```

### 2. 環境変数の設定
`.env.local`ファイルを作成してGemini APIキーを設定：
```bash
# frontend/.env.local
VITE_API_KEY="YOUR_GEMINI_API_KEY_HERE"
```

### 3. 開発サーバーの起動
```bash
npm run dev
```

デフォルトでは、Viteは**ポート5173**で起動します。

### 4. バックエンドとの連携設定
現在の設定では、フロントエンドは`http://localhost:8080`のバックエンドに接続するようになっていますが、あなたが3000番台のポートを使用予定とのことなので、必要に応じて設定を変更できます。

### 5. アクセス
ブラウザで `http://localhost:5173` にアクセスしてアプリケーションを確認できます。

## 注意点
- フロントエンドはポート5173で起動
- バックエンドは別のフォルダのプログラムを使用予定（3000番台ポート）
- Gemini APIキーが必要（AI機能を使用する場合）

何か他にご質問があればお聞かせください！

