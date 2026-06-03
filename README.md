# 公開鍵暗号 × ブロックチェーン / Public-Key Cryptography for Blockchains

ブロックチェーンで使われる公開鍵暗号を、手を動かして学べるインタラクティブなデモサイトです。すべての計算はブラウザ内で完結し、外部に何も送信しません。日本語 / English のトグル切り替えに対応。

An interactive demo to learn the public-key cryptography behind blockchains. Everything is computed locally in the browser — nothing is ever sent anywhere. Japanese / English toggle.

## What you can explore / 体験できること

- **鍵ペアとアドレス / Key Pairs & Addresses** — 1つの秘密鍵から Solana・Bitcoin・Ethereum のアドレスを同時に導出。チェーンごとに導出方法がまったく違うことを並べて確認。
- **楕円曲線 / Elliptic Curves** — 小さな有限体の曲線 `y² = x³ + 7 (mod 97)` で点の足し算・スカラー倍を可視化し、一方通行性（離散対数の難しさ）を体験。
- **デジタル署名 / Digital Signatures** — ECDSA(secp256k1) と EdDSA(Ed25519) を切り替え。署名後にメッセージを改ざんすると検証がリアルタイムで失敗。
- **ハッシュ / Hashing** — SHA-256・Keccak-256 のライブ計算とアバランチ効果、なぜハッシュに署名するのか。
- **チェーン比較 / Cross-Chain Comparison** — 1つの秘密鍵を3チェーンに通し、曲線・署名方式・ハッシュ・エンコードの違いを一覧化。

## Key teaching point / 核心の学び

Solana は **Ed25519 (EdDSA)**、Bitcoin / Ethereum は **secp256k1 (ECDSA)** を使います。曲線も署名方式もアドレス導出も違う — この対比がこのサイトの軸です。

## Tech stack

React 18 + Vite + TypeScript。本物の暗号は [@noble/curves](https://github.com/paulmillr/noble-curves) / [@noble/hashes](https://github.com/paulmillr/noble-hashes) / [@scure/base](https://github.com/paulmillr/scure-base) で実行（polyfill 不要・ブラウザ完結）。

## Development

```bash
npm install
npm run dev       # ローカル開発サーバー
npm run build     # 型チェック + 本番ビルド -> dist/
npm run preview   # 本番ビルドのプレビュー
```

## Deployment

`main` ブランチへの push で GitHub Actions（`.github/workflows/deploy.yml`）が自動デプロイします。
リポジトリ設定で **Settings → Pages → Source = GitHub Actions** を一度だけ有効にしてください。

`vite.config.ts` の `base` はリポジトリ名（`/pub-key-cryptography/`）に一致させています。リポジトリ名を変える場合はここも合わせてください。

> ⚠️ このサイトの極小曲線は学習用で安全ではありません。実際に資産が入っている秘密鍵は絶対に入力しないでください。
