const urlGold = "https://www.goldapi.io/api/XAU/INR";

async function fetchGoldRate() {
  try {
    const response = await fetch(urlGold, {
      headers: {
        "x-access-token": "goldapi-3k86lysmhaw1shg-io",
        "content-type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch gold rate");
    const data = await response.json();

    const goldPerOunce = data.price;
    const goldPerGram = goldPerOunce / 31.1035;
  } catch (err) {
    console.error("Error fetching gold rate:", err);
  }
}

function displayGold(priceInINR) {
  const container = document.getElementById("crypto-table");

  const div = document.createElement("div");
  div.classList.add("coin");

  div.innerHTML = `
    <img src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" width="40" height="40" alt="Gold">
    <h3>Gold (24K)</h3>
    <p class="price">₹${priceInINR.toLocaleString(undefined, { maximumFranctionDigits: 2 })}</p>
    <p class="change" style="color: gold">Live Rate</p>
    `;

  container.appendChild(div);
}
