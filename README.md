# Weather App

都市名を入力すると、その都市の現在の天気情報を表示する天気アプリです。

## 🌐 デモ

https://weather-app-ashen-delta-42.vercel.app/

## 📌 機能

- 都市名（日本語・英語対応）で天気を検索
- 現在の気温・風速・天気状況を表示
- 都市が見つからない場合や通信エラー時のフィードバック表示

## 🛠 使用技術

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) — 都市名から緯度・経度を取得
- [Open-Meteo Weather API](https://open-meteo.com/en/docs) — 緯度・経度から天気情報を取得

