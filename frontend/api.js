// api.js: модуль для зв'язку з бекендом і з Open-Meteo (безкоштовна погода, без ключа).
// Сам по собі файл не відкривається в браузері: його підключають до сторінки
// тегом <script src="api.js"></script> ПЕРЕД своїм script.js.

// true: брати локальний бекенд (http://localhost:8080), false: бекенд на Render
const USE_LOCAL_BACKEND = false;

const API_URL = USE_LOCAL_BACKEND
    ? "http://localhost:8080"
    : "https://connectbetweenback.onrender.com";

async function getJson(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
    }
    return response.json();
}

// Бекенд команди
async function pingBackend() {
    return getJson(`${API_URL}/`);
}

// Розшифровка кодів погоди Open-Meteo (WMO)
function describeWeather(code) {
    if (code === 0) return "Ясно";
    if (code <= 3) return "Хмарно";
    if (code === 45 || code === 48) return "Туман";
    if (code >= 51 && code <= 57) return "Мряка";
    if (code >= 61 && code <= 67) return "Дощ";
    if (code >= 71 && code <= 77) return "Сніг";
    if (code >= 80 && code <= 82) return "Злива";
    if (code === 85 || code === 86) return "Снігопад";
    if (code >= 95) return "Гроза";
    return "Невідомо";
}

// Open-Meteo: знайти місто за назвою -> координати
async function findCity(name) {
    const url = "https://geocoding-api.open-meteo.com/v1/search?count=1&language=uk&name="
        + encodeURIComponent(name);
    const data = await getJson(url);
    if (!data.results || data.results.length === 0) {
        throw new Error(`Місто "${name}" не знайдено`);
    }
    const c = data.results[0];
    return { name: c.name, country: c.country, latitude: c.latitude, longitude: c.longitude };
}

// Open-Meteo: поточна погода в місті за назвою
async function getWeather(cityName) {
    const city = await findCity(cityName);
    const url = "https://api.open-meteo.com/v1/forecast"
        + `?latitude=${city.latitude}&longitude=${city.longitude}`
        + "&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto";
    const data = await getJson(url);
    return {
        city: city.name,
        country: city.country,
        temperature: data.current.temperature_2m,   // °C
        wind: data.current.wind_speed_10m,          // км/год
        description: describeWeather(data.current.weather_code),
    };
}
