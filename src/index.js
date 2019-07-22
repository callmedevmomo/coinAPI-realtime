import "./styles.css";

const API_URL = "https://api.coinpaprika.com/v1/tickers";

const coinData = document.querySelector(".coinData");
const coinRank = document.getElementById("coinRank");
const coinName = document.getElementById("coinName");
const coinPrice = document.getElementById("coinPrice");
const coinPrice12 = document.getElementById("coinPrice12");
const coinPrice24 = document.getElementById("coinPrice24");
const coinUpdate = document.getElementById("coinUpdate");

function setNumber(a, b) {
  return new Number(a.rank) - new Number(b.rank);
}

function momo() {
  coinData.innerHTML = "Loading data🔎";

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      data.sort(setNumber);
      for (let i = 0; i < data.length; i++) {
        const {
          rank,
          name,
          last_updated,
          quotes: {
            USD: {
              price,
              percent_change_12h: price_half,
              percent_change_24h: price_day
            }
          }
        } = data[i];

        const rankset = document.createElement("span");
        const nameset = document.createElement("span");
        const priceset = document.createElement("span");
        const halfset = document.createElement("span");
        const dayset = document.createElement("span");
        const updatedset = document.createElement("span");

        rankset.innerHTML = rank;
        nameset.innerHTML = name;
        priceset.innerHTML = price;
        halfset.innerHTML = price_half;
        dayset.innerHTML = price_day;
        updatedset.innerHTML = last_updated;

        coinRank.appendChild(rankset);
        coinName.appendChild(nameset);
        coinPrice.appendChild(priceset);
        coinPrice12.appendChild(halfset);
        coinPrice24.appendChild(dayset);
        coinUpdate.appendChild(updatedset);
        coinData.innerHTML =
          "All data is updated! Good Luck to your investment!";
      }
    })

    .catch(e => {
      console.log(e);
      coinData.innerHTML = "Can't find Data!";
    });
}

setInterval(momo, 5000);
