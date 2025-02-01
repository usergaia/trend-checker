async function fetchData() {
    const url = 'https://twitter-trends5.p.rapidapi.com/twitter/request.php';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '901700caeemshcf672f08048b777p17be02jsn93bc25dcc1da',
            'x-rapidapi-host': 'twitter-trends5.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ woeid: '23424977' })
    };

    
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    // Get the trends list container
    const trendsContainer = document.getElementById("Trends");
    
    // Convert object to array and iterate over each trend
    Object.entries(result.trends).forEach(([key, item]) => {
        const trendItem = document.createElement("li");
        trendItem.innerHTML = `
            <div class="trend-box">
                <span class="trend-key">#${key}</span>
                <span class="trend-name">${item.name}</span>
            </div>
        `;
        trendsContainer.appendChild(trendItem);
    });


}

fetchData();
