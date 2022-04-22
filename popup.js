// Initialize button with user's preferred color
//this is from Chrome extension tutorial, left it here just in case
let changeColor = document.getElementById('changePrice');

chrome.storage.sync.get('color', ({ color }) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setConvertedPrice into current page
changeColor.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: zaraConvertPrices,
    });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: duttiConvertPrices,
    });
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: marellaConvertPrices,
    });
});

function zaraConvertPrices() {
    for (let a of document.querySelectorAll('.price-current__amount')) {
        let b = parseFloat(a.textContent.replace(',', '.'));
        const node = document.createElement('span');
        const textnode = document.createTextNode(
            ' ' + (b * 0.20254).toFixed(2) + ' euros'
        );
        node.style.color = 'red';
        node.appendChild(textnode);
        a.appendChild(node);
        //this works, but need to save the price first so that it
        //doesn't update on every click
        //a.textContent = (b * 0.20254).toFixed(2) + ' euros';
    }
}

function duttiConvertPrices() {
    for (let a of document.querySelectorAll('.product-price')) {
        let b = parseFloat(a.textContent.replace(',', '.'));
        const node = document.createElement('span');
        const textnode = document.createTextNode(
            ' ' + (b * 0.20254).toFixed(2) + ' euros'
        );
        node.style.color = 'red';
        node.appendChild(textnode);
        a.appendChild(node);
    }
}
// commented out for now, too many string manipulations,
//going back to the original

// function marellaConvertPrices() {
//     for (let a of document.querySelectorAll(
//         '.card-prod.js-product-card div span.price'
//     )) {
//         //console.log(aa);
//         let b = a.textContent.trim().replace('lei', '');
//         let bb = b.replace('.', '');
//         let c = parseFloat(bb.replace(',', '.'));
//         const node = document.createElement('span');
//         const textnode = document.createTextNode(
//             ' ' + (c * 0.20254).toFixed(2) + ' euros'
//         );
//         node.style.color = 'red';
//         node.appendChild(textnode);
//         a.appendChild(node);
//     }
// }

// The body of this function will be executed as a content script inside the
// current page

function marellaConvertPrices() {
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

    chrome.storage.sync.get('money', ({ money }) => {
        allPricesArray.map((element, i) => {
            element.innerText = myCardsPricesConverted[i] + ' euros';
        });
    });
}

function allWebsites() {
    marellaConvertPrices();
    zaraConvertPrices();
    duttiConvertPrices();
}
