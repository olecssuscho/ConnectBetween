// API_URL і pingBackend() беруться з api.js (воно підключене раніше).
// Тут API_URL оголошувати не можна: інакше помилка "already been declared".

const button = document.getElementById("btn");
const cont = document.getElementById("cont");
const scoreEl = document.getElementById("score");

button.addEventListener("click", async () => {
    try {
        cont.textContent = await pingBackend();
    } catch (error) {
        cont.textContent = "Backend is not available";
        console.error(error);
    }
});

// Повідомлення від гри (Godot, всередині iframe): { type: "game-over", score: 12 }
window.addEventListener("message", (event) => {
    if (event.origin !== location.origin) return;
    if (event.data && event.data.type === "game-over") {
        scoreEl.textContent = `Рахунок гри: ${event.data.score}`;
        // Тут можна надіслати результат на бекенд, коли з'явиться ендпоінт /scores.
    }
});