let color = '#3aa757';
let money = 'многа';

// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.sync.set({ color });
//     console.log('Default background color set to %cgreen', `color: ${color}`);
// });

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ money });
    console.log('Сколько евриков %cmoney', `money: ${money}`);
});
