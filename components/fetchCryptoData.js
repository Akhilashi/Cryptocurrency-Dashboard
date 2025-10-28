const apiURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false";

async function fetchCryptoData() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    displayCrypto(data);
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
    div.innerHTML = `<img src="${coin.image}" alt="${coin.name}" width="40" height="40"/>
          <h3>${coin.name}</h3>
          <p class="price">$${coin.current_price.toLocaleString()}</p>
          <p class="change" style="color:${coin.price_change_percentage_24h >= 0 ? "lightgreen" : "red"}>
          ${coin.price_change_percentage_24h.toFixed(2)}%</p>`;

    container.appendChild(div);
  });
}
