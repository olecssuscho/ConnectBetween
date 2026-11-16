const BACKEND_URL = "https://connectbetweenback.onrender.com"

const button = document.getElementById("btn");
const cont = document.getElementById("cont");

button.addEventListener("click", async () =>{
    try {
        const response = await fetch(`${BACKEND_URL}`);
        if (!response.ok){
            throw new Error(`Server returned ${response.status}`);
        }
        const data = await response.json();
        cont.textContent = data;
    } catch (error) {
    cont.textContent = "Backend is not available";
    console.error(error);
    }
}) 