// select elements
const searchBtn = document.querySelector("#search");
const searchInput = document.querySelector("#searchInput");

const tempratureElem = document.querySelector(".temprature");
const locationElem = document.querySelector(".location");
const emojiImg = document.querySelector(".emoji");
const timeElem = document.querySelector(".time");
const dateElem = document.querySelector(".Date");
const conditionElem = document.querySelector(".condition");

// button click
searchBtn.addEventListener("click", async function () {
    console.log("CLICK WORKING"); // debug

    const location = searchInput.value;

    if (location !== "") {
        const data = await fetchWeather(location);

        if (data !== null) {
            updateDOM(data);
        }

        searchInput.value = "";
    }
});

// update UI
function updateDOM(data) {
    const temp = data.current.temp_c;
    const location = data.location.name;
    const timeData = data.location.localtime;

    const [date, time] = timeData.split(" ");
    const iconLink = data.current.condition.icon;
    const condition = data.current.condition.text;

    tempratureElem.textContent = temp + "°C";
    locationElem.textContent = location;

    // ✅ FIXED: add https
    emojiImg.src = "https:" + iconLink;

    dateElem.innerText = date;
    timeElem.innerText = time;
    conditionElem.innerText = condition;
}

// fetch API
async function fetchWeather(location) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=6fc74cf82bc44773a8a171855241407&q=${location}&aqi=no`;

        const response = await fetch(url);

        if (!response.ok) {
            alert("Invalid location");
            return null;
        }

        const json = await response.json();
        return json;

    } catch (error) {
        console.error(error);
        alert("API error or network issue");
        return null;
    }
}
