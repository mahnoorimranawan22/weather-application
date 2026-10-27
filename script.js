/* ─ WeatherNow – script.js ──────────────────────────── */

const API_KEY = 'bf06e32f039b6cb1253a1c3bcfdfd14f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const MAX_RECENT = 5;
const STORAGE_KEY = 'weathernow_recent';

/* ── DOM refs ────────────────────────────────────────── */
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const loadingWrap = document.getElementById('loading-wrap');
const errorCard = document.getElementById('error-card');
const errorMessage = document.getElementById('error-message');
const weatherCard = document.getElementById('weather-card');
const recentSection = document.getElementById('recent-section');
const recentList = document.getElementById('recent-list');

const elCityName = document.getElementById('city-name');
const elDesc = document.getElementById('weather-desc');
const elIcon = document.getElementById('weather-icon');
const elTemp = document.getElementById('temp-value');
const elHumidity = document.getElementById('humidity');
const elWind = document.getElementById('wind-speed');
const elFeels = document.getElementById('feels-like');

/* ── Init ────────────────────────────────────────────── */
renderRecentList();

/* ── Event Listeners ─────────────────────────────────── */
form.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

/* ── 3. Fetch API ────────────────────────────────────── */
async function fetchWeather(city) {
    showLoading();

    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
            // 5. Handle errors
            const msg = data.cod === '404'
                ? `"${city}" not found. Please check the city name and try again.`
                : `Error ${data.cod}: ${data.message}`;
            showError(msg);
            return;
        }

        // 4. Display weather
        renderWeather(data);

        // 6. Save history
        saveRecentCity(data.name);
        renderRecentList();

        cityInput.value = '';
    } catch (err) {
        // 5. Handle errors – network failure
        showError('Network error. Please check your connection and try again.');
    }
}

/* ── 4. Display Weather ──────────────────────────────── */
function renderWeather(data) {
    elCityName.textContent = `${data.name}, ${data.sys.country}`;
    elDesc.textContent = data.weather[0].description;
    elTemp.textContent = `${Math.round(data.main.temp)}°C`;
    elHumidity.textContent = `${data.main.humidity}%`;
    elWind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    elFeels.textContent = `${Math.round(data.main.feels_like)}°C`;

    const iconCode = data.weather[0].icon;
    elIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    elIcon.alt = data.weather[0].description;

    hideAll();
    weatherCard.style.display = 'block';
}

/* ── 6. localStorage History ─────────────────────────── */
function getRecentCities() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch { return []; }
}

function saveRecentCity(city) {
    let cities = getRecentCities().filter(c => c.toLowerCase() !== city.toLowerCase());
    cities.unshift(city);
    if (cities.length > MAX_RECENT) cities = cities.slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}

function renderRecentList() {
    const cities = getRecentCities();

    if (cities.length === 0) {
        recentSection.style.display = 'none';
        return;
    }

    recentList.innerHTML = '';
    cities.forEach(city => {
        const li = document.createElement('li');
        li.setAttribute('role', 'listitem');
        const btn = document.createElement('button');
        btn.className = 'recent-chip';
        btn.textContent = city;
        btn.setAttribute('aria-label', `Search weather for ${city}`);
        btn.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeather(city);
        });
        li.appendChild(btn);
        recentList.appendChild(li);
    });

    recentSection.style.display = 'block';
}

/* ── UI Helpers ──────────────────────────────────────── */
function hideAll() {
    loadingWrap.style.display = 'none';
    errorCard.style.display = 'none';
    weatherCard.style.display = 'none';
}

function showLoading() {
    hideAll();
    loadingWrap.style.display = 'flex';
}

function showError(msg) {
    hideAll();
    errorMessage.textContent = msg;
    errorCard.style.display = 'flex';

    // Re-trigger shake animation
    errorCard.style.animation = 'none';
    void errorCard.offsetWidth;
    errorCard.style.animation = '';
}
