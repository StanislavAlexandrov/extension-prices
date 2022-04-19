// Initialize button with user's preferred color
//this is from Chrome extension tutorial, left it here just in case
let changeColor = document.getElementById('changePrice');

chrome.storage.sync.get('color', ({ color }) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setConvertedPrice into current page
changeColor.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setConvertedPrice,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setConvertedPrice() {
    //select all item cards
    let myCards = document.querySelectorAll('.card-prod.js-product-card');
    // convert nodelist to array and get all prices
    let myCardsArray = [...myCards];
    let myCardsPrices = myCardsArray.map((element) =>
        parseFloat(element.querySelector('div').dataset.price)
    );
    let myCardsPricesConverted = myCardsPrices.map(
        (element) => +(element * 0.20254).toFixed(2)
    );

    let allPrices = document.querySelectorAll('.price');
    let allPricesArray = [...allPrices];

    // chrome.storage.sync.get('color', ({ color }) => {
    //     document.body.style.backgroundColor = color;
    // });
    chrome.storage.sync.get('money', ({ money }) => {
        allPricesArray.map((element, i) => {
            element.innerText = myCardsPricesConverted[i] + ' euros';
        });
    });
}
