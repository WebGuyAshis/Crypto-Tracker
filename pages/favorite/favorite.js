let favoritesList = JSON.parse(localStorage.getItem("favoritesList")) || [];
const coinsTable = document.querySelector("#coins-table-body");

// Populate Fav Table
const populateTable = (coins) => {
  coinsTable.innerHTML = "";
  if (coins.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan='6' style='text-align:center;'>
No Data Found
</td>`;
    coinsTable.appendChild(row);
    return;
  }
  coins.forEach((coin) => {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td><img src="${coin.image}" alt="${
      coin.name
    } Image" width="20"></td>
              <td>${coin.name}</td>
              <td>${coin.current_price} USD</td>
              <td>${coin.market_cap.toLocaleString()} USD</td>
              <td>${coin.ath_change_percentage.toFixed(2)}%</td>
              <td>
                  <button class="like-btn">Unlike</button>
              </td>
          `;
    row
      .querySelector(".like-btn")
      .addEventListener("click", () => removeFromFavorites(coin));
    coinsTable.appendChild(row);
  });
};

populateTable(favoritesList);

const removeFromFavorites = (coin) => {
  favoritesList = favoritesList.filter((favCoin) => favCoin.id !== coin.id);
  populateTable(favoritesList);
  localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
};
