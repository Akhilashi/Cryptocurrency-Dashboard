const portfolio = [];

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
