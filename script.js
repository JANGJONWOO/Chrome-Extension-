const table = document.querySelector('.tbody');
const fights = async function () {
    const url = 'https://cryptocurrency-markets.p.rapidapi.com/v1/crypto/coins?page=1';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '8fdc2a295dmsh0a2b08a7235ec7fp1f62fcjsnad9917e770f8',
            'x-rapidapi-host': 'cryptocurrency-markets.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result); // Log the result to see the structure

        // Check if result.data is an array, if not convert it to an array
        let coins = [];
        if (Array.isArray(result.data)) {
            coins = result.data;
        } else if (typeof result.data === 'object') {
            coins = Object.values(result.data); // Convert object values to an array
        } else {
            console.error('Unexpected data format:', result.data);
            return;
        }

        // Iterate through the coins array and append rows to the table
        coins.forEach(coin => {
            if (coin.rank <= 20) {
                table.innerHTML += `<tr><td><img src = ${coin.logo}></td>
                                <td>${coin.name}</td> 
                                <td>${coin.symbol}</td>
                                <td>${coin.rank}</td>
                                <td>${Math.ceil(coin.high24h)}</td>
                                <td>${Math.ceil(coin.totalSupply)}</td>
                                </tr>`;

            }
            else {
                return;
            }
        });
    } catch (error) {
        console.error(error);
    }
}

fights();
