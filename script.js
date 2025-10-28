const apiURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false";

async function fetchCryptoData() {
  const res = await fetch(apiURL);
  const data = await res.json();
  displayCrypto(data);
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

fetchCryptoData();
setInterval(fetchCryptoData, 60000);

async function drawChart() {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7");
  const data = await res.json();

  const labels = data.prices.map((price) => {
    const date = new Date(price[0]);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const prices = data.prices.map((price) => price[1]);

  const ctx = document.getElementById("priceChart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin (USD)",
          data: prices,
          borderColor: "#38bdf8",
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: false },
      },
    },
  });
}
drawChart();

const portfolio = {};

document.getElementById("addCoin").addEventListener("click", async () => {
  const coin = document.getElementById("coinInput").ariaValueMax.toLowerCase();
  const amount = parseFloat(document.getElementById("amountInput").value);

  if (!coin || isNaN(amount)) return alert("Enter valid coin and amount");

  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
  const data = await res.json();

  if (!data[coin]) return alert("Coin not found");

  const value = data[coin].usd * amount;
  portfolio[coin] = { amount, value };

  displayportfolio();
});

function displayportfolio() {
  const container = document.getElementById("portfolio");
  container.innerHTML = "";
  let total = 0;

  for (const [coin, info] of Object.entries(portfolio)) {
    total += info.value;
    container.innerHTML += `<p>${coin.toUpperCase()}: $${info.value.toFixed(2)}</p>`;
  }

  container.innerHTML += `<hr><p><strong>Total Portfolio: $${total.toFixed(2)}</strong></p>`;
}
