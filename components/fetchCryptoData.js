import { drawChart } from "./drawChart.js";

const apiURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false";

export async function fetchCryptoData() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    displayCrypto(data);
    createTabs(data);
  } catch (error) {
    console.error("Error fetching crypto data", error);
  }
}

function displayCrypto(data) {
  const container = document.getElementById("crypto-table");
  container.innerHTML = "";

  data.forEach((coin) => {
    const div = document.createElement("div");
    div.classList.add("coin");
    div.innerHTML = `
    <div class="coin-info">
          <img src="${coin.image}" alt="${coin.name}" width="50" height="50" />
          <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
          <p>Price: $${coin.current_price.toLocaleString()}</p>
          <p style="color:${coin.price_change_percentage_24h >= 0 ? "lightgreen" : "red"}">
            24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%
          </p>
          <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
        </div>
      `;
    container.appendChild(div);
  });
}

function createTabs(data) {
  const tabButtons = document.getElementById("tab-buttons");
  const tabContent = document.getElementById("tab-content");

  tabButtons.innerHTML = "";
  tabContent.innerHTML = "";

  data.forEach((coin, index) => {
    const button = document.createElement("button");
    button.textContent = coin.name;
    button.className = "tab-btn";
    if (index === 0) button.classList.add("active");

    // const content = document.createElement("div");
    // content.className = "tab-panel";
    // if (index === 0) content.classList.add("active");

    button.addEventListener("click", () => {
      document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"));

      // document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");
      // content.classList.add("active");
      drawChart(coin.id, coin.name);
    });

    tabButtons.appendChild(button);
    // tabContent.appendChild(content);
  });
  drawChart(data[0].id, data[0].name);
}
