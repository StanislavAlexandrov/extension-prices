let color = '#3aa757';
let money = 'многа';

// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.sync.set({ color });
//     console.log('Default background color set to %cgreen', `color: ${color}`);
// });

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ money });
    console.log('show money %cmoney', `money: ${money}`);
});

// this shows active tab, but it's unstable

// chrome.tabs.onActivated.addListener(function (activeInfo) {
//     chrome.tabs.get(activeInfo.tabId, function (tab) {
//         y = tab.url;
//         console.log('you are here: ' + y);
//         chrome.storage.sync.set({ page: y });
//     });
// });

// chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
//     if (tab.active && change.url) {
//         console.log('you are here: ' + change.url);
//         chrome.storage.sync.set({ page: change.url });
//     }
// });
