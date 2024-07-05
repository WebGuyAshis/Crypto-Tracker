// script.js
const coinsTable = document.querySelector('#coins-table-body');
const favoritesList = [];

// fetching all coins
const fetchCryptoCoins = async (page = 1) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}`);
        const data = await response.json();
        console.log("Coin Data", data);
        populateTable(data);
    } catch (error) {
        console.error("Error fetching coin data:", error);
    }
};

const populateTable = (coins) => {
    coinsTable.innerHTML = ''; // Clear existing rows
    coins.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name} Image" width="20"></td>
            <td>${coin.name}</td>
            <td>${coin.current_price} USD</td>
            <td>${coin.market_cap.toLocaleString()} USD</td>
            <td>${coin.ath_change_percentage.toFixed(2)}%</td>
            <td>
                <button class="like-btn">${favoritesList.includes(coin.id) ? 'Unlike' : 'Like'}</button>
                <button class="view-btn">View</button>
            </td>
        `;
        row.querySelector('.like-btn').addEventListener('click', () => toggleFavorite(coin));
        row.querySelector('.view-btn').addEventListener('click', () => viewCoin(coin));
        coinsTable.appendChild(row);
    });
};

const toggleFavorite = (coin) => {
    const index = favoritesList.indexOf(coin.id);
    if (index === -1) {
        favoritesList.push(coin.id);
    } else {
        favoritesList.splice(index, 1);
    }
    populateTable(JSON.parse(sessionStorage.getItem('coinsData')));
};

const viewCoin = (coin) => {
    console.log(coin);
};

const createPagination = (totalPages) => {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; // Clear existing pagination
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => fetchCryptoCoins(i));
        paginationContainer.appendChild(pageButton);
    }
};

fetchCryptoCoins();

// Assuming totalPages is 5 for example purposes. Adjust based on your API response.
createPagination(5);
