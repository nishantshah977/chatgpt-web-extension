const form = document.querySelector("form");
const apiUrl = "https://web-scraper-alpha-eight.vercel.app/scrape";

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const url_to_scrape = document.querySelector("input").value;
        
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"url": url_to_scrape})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "addInput", content: data }, function(response) {
                    console.log(response.message);
                });
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
} else {
    console.error("Form element not found on the webpage");
}
