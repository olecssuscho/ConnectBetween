// api.js: модуль для зв'язку з бекендом і безкоштовними публічними API.
// Сам по собі файл не відкривається в браузері: його підключають до сторінки
// тегом <script src="api.js"></script> ПЕРЕД своїм script.js.

const API_URL = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "http://localhost:8080"
    : "https://connectbetweenback.onrender.com";

async function getJson(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
    }
    return response.json();
}

// 1. Бекенд команди
async function pingBackend() {
    return getJson(`${API_URL}/`);
}

// 2. Безкоштовні API без ключів (працюють з браузера, CORS дозволений)

// Вікіпедія (українська): пошук статей за запитом
async function searchWikipedia(query) {
    const url = "https://uk.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=5&search="
        + encodeURIComponent(query);
    const [, titles, , links] = await getJson(url);
    return titles.map((title, i) => ({ title, link: links[i] }));
}

// Open Library: пошук книг
async function searchBooks(query) {
    const data = await getJson("https://openlibrary.org/search.json?limit=5&q=" + encodeURIComponent(query));
    return data.docs.map(d => ({ title: d.title, author: (d.author_name || [])[0] || "невідомо", year: d.first_publish_year }));
}

// REST Countries: інформація про країну
async function searchCountry(name) {
    const data = await getJson("https://restcountries.com/v3.1/name/" + encodeURIComponent(name)
        + "?fields=name,capital,population");
    return data.map(c => ({ name: c.name.common, capital: (c.capital || [])[0], population: c.population }));
}
