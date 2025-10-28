async function drawChart() {
  try {
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
  } catch (error) {
    console.error("Error drawing chart:", error);
  }
}
