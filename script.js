// Function to fetch Twitter trends
async function fetchData() {
    const url = 'https://twitter-trends5.p.rapidapi.com/twitter/request.php';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '901700caeemshcf672f08048b777p17be02jsn93bc25dcc1da',
            'x-rapidapi-host': 'twitter-trends5.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ woeid: '23424977' }) // WOEID for the United States
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("Twitter Trends:", result);

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
    } catch (error) {
        console.error("Error fetching Twitter trends:", error);
    }
}

// Function to fetch news headlines
async function fetchDataNews() {
    const url = 'https://google-news22.p.rapidapi.com/v1/search?q=euro&country=us&language=en';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd1d859719dmshd0273a856dc9079p1bd064jsn70b93283e5ba',
            'x-rapidapi-host': 'google-news22.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const newsContainer = document.getElementById("News");

        // Check if the response contains the expected data
        if (result && result.data && result.data.length > 0) { 
            // Iterate over the news articles and display them
            result.data.forEach((article, index) => {
                if (index < 10) { // Limit to top 10 headlines
                    const newsItem = document.createElement("li");
                    newsItem.innerHTML = `
                        <div class="news-box">
                            <span class="news-title">${article.title}</span>
                            <a href="${article.url}" target="_blank" class="news-link">Read more</a>
                        </div>
                    `;
                    newsContainer.appendChild(newsItem);
                }
            });
        } else {
            newsContainer.innerHTML = "<li>No articles found.</li>";
        }
    } catch (error) {
        console.error("Error fetching news headlines:", error);
    }
}

fetchData();
fetchDataNews();