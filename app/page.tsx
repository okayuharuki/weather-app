"use client";

import { useState } from "react";

// ▼データの「設計図」を作る！
type WeatherData = {
  cityName: string;
  temperature: number | string;
  windSpeed: number | string;
  weatherCode: number | null;
};

export default function WeatherApp() {
  // ▼ バラバラだった3つの箱を、1つの「weather」という大きな箱にまとめる！
  const [weather, setWeather] = useState<WeatherData>({
    cityName: "東京",
    temperature: "--",
    windSpeed: "--",
    weatherCode: null,
  });

  const onClickTokyo = async () => {
    // ボタンを押した瞬間、まずは名前だけ変えて、気温は「--」にしておく（計算中のような演出！）
    setWeather({ cityName: "東京", temperature: "--", windSpeed: "--", weatherCode: null });

    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true",
    );
    const data = await response.json();

    // データが届いたら、本物の数字を入れたセットで箱を丸ごと上書きする！
    setWeather({
      cityName: "東京",
      temperature: data?.current_weather?.temperature,
      windSpeed: data?.current_weather?.windspeed,
      weatherCode: data?.current_weather?.weathercode,
    });
  };

  const onClickOsaka = async () => {
    setWeather({ cityName: "大阪", temperature: "--", windSpeed: "--", weatherCode: null });
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=34.6937&longitude=135.5023&current_weather=true",
    );
    const data = await response.json();

    setWeather({
      cityName: "大阪",
      temperature: data?.current_weather?.temperature,
      windSpeed: data?.current_weather?.windspeed,
      weatherCode: data?.current_weather?.weathercode,
    });
  };

  const onClickSapporo = async () => {
    setWeather({ cityName: "札幌", temperature: "--", windSpeed: "--", weatherCode: null });
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=43.0618&longitude=141.3545&current_weather=true",
    );
    const data = await response.json();

    setWeather({
      cityName: "札幌",
      temperature: data?.current_weather?.temperature,
      windSpeed: data?.current_weather?.windspeed,
      weatherCode: data?.current_weather?.weathercode,
    });
  };

  // ▼ 追加：天気コードを絵文字に変換する翻訳機！
  const getWeatherIcon = (code: number | null) => {
    if (code === null) return "🌤️"; // データがない時はデフォルト
    if (code === 0) return "☀️"; // 快晴
    if (code === 1 || code === 2 || code === 3) return "☁️"; // 晴れ時々曇り、曇り
    if (code >= 51 && code <= 67) return "☔️"; // 雨
    if (code >= 71 && code <= 77) return "⛄️"; // 雪
    return "🌍"; // それ以外
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center py-20 font-sans text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-sky-600">🌤️ リアルタイム天気予報</h1>

      <div className="flex gap-4 mb-12">
        <button
          onClick={onClickTokyo}
          className="bg-white border-2 border-sky-300 text-sky-700 px-6 py-2 rounded-full font-bold shadow-sm hover:bg-sky-100 transition-colors"
        >
          東京
        </button>
        <button
          onClick={onClickOsaka}
          className="bg-white border-2 border-sky-300 text-sky-700 px-6 py-2 rounded-full font-bold shadow-sm hover:bg-sky-100 transition-colors"
        >
          大阪
        </button>
        <button
          onClick={onClickSapporo}
          className="bg-white border-2 border-sky-300 text-sky-700 px-6 py-2 rounded-full font-bold shadow-sm hover:bg-sky-100 transition-colors"
        >
          札幌
        </button>
      </div>

      <div className="bg-white w-96 rounded-3xl shadow-xl p-8 text-center border-8 border-sky-400">
        {/* ▼ 箱が1つになったので「weather.cityName」のようにドットで中身を取り出す！ */}
        <h2 className="text-2xl font-bold text-gray-600 mb-6">{weather.cityName}</h2>

        <div>
          <div className="text-6xl font-black text-gray-800 mb-2">
            {getWeatherIcon(weather.weatherCode)}
            {weather.temperature}
            <span className="text-3xl text-gray-500 font-bold"> ℃</span>
          </div>
          <p className="text-gray-500 font-medium mt-4">風速: {weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}
