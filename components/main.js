import { fetchCryptoData } from "./fetchCryptoData.js";
// import { fetchGoldRate } from "./fetchGoldRate.js";

fetchCryptoData();
setInterval(fetchCryptoData, 60000);
