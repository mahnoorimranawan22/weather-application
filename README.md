# 🌤 WeatherNow

A clean, responsive **real-time weather application** built with HTML, CSS, and JavaScript using the [OpenWeatherMap API](https://openweathermap.org/api).

![WeatherNow Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square) ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## ✨ Features

- 🔍 **Search by city name** — get weather for any city worldwide
- 🌡️ **Temperature in Celsius** with feels-like reading
- 🌥️ **Weather condition** with the matching OpenWeather icon
- 💧 **Humidity** percentage
- 💨 **Wind speed** in km/h
- ⏳ **Loading indicator** while fetching data
- ⚠️ **Error handling** — friendly message for invalid or misspelled cities
- 🕐 **Recent searches** — last 5 cities saved in `localStorage`; click any chip to reload its weather instantly

---

## 📁 Project Structure

```
weather-application/
├── index.html      # App structure — search form, weather card, recent searches
├── style.css       # Dark glassmorphism UI, responsive layout
└── script.js       # OpenWeather API fetch, DOM updates, localStorage logic
```

---

## 🚀 Getting Started

No build tools or dependencies required — it runs directly in the browser.

### 1. Clone the repository

```bash
git clone https://github.com/mahnoorimranawan22/weather-application.git
cd weather-application
```

### 2. Open in browser

Double-click `index.html`, or open it with Live Server in VS Code.

> ✅ No npm install, no server setup needed.

---

## 🔑 API Key

This project uses the **OpenWeatherMap Current Weather API**.

The API key is already set in `script.js`:

```js
const API_KEY = 'bf06e32f039b6cb1253a1c3bcfdfd14f';
```

To use your own key:
1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Copy your API key
3. Replace the value of `API_KEY` in `script.js`

---

## 🌐 API Reference

**Endpoint used:**

```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
```

**Key fields parsed from the response:**

| Field | Source |
|---|---|
| City & Country | `data.name`, `data.sys.country` |
| Temperature | `data.main.temp` |
| Feels Like | `data.main.feels_like` |
| Condition | `data.weather[0].description` |
| Icon | `data.weather[0].icon` |
| Humidity | `data.main.humidity` |
| Wind Speed | `data.wind.speed` |

---

## 📱 Responsive Design

The layout adapts cleanly to all screen sizes:

- **Desktop** — side-by-side search input and button, full weather card
- **Mobile** — stacked search form, compact stats layout

---

## 🗂️ How It Works

```
User enters city name
        ↓
Script fetches data from OpenWeather API
        ↓
  ┌─────────────────────┐
  │ Success             │ → Renders weather card + saves city to localStorage
  │ Invalid city (404)  │ → Shows error message with shake animation
  │ Network failure     │ → Shows connection error message
  └─────────────────────┘
        ↓
Recent searches updated (max 5, stored in localStorage)
User can click any recent city chip to reload its weather
```

---

## 🛠️ Built With

- **HTML5** — semantic structure
- **CSS3** — glassmorphism dark theme, CSS animations, Flexbox layout
- **Vanilla JavaScript** — Fetch API, DOM manipulation, localStorage
- **[OpenWeatherMap API](https://openweathermap.org/api)** — real-time weather data
- **[Google Fonts – Inter](https://fonts.google.com/specimen/Inter)** — typography

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
