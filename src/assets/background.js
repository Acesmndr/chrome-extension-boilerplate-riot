chrome.browserAction.setBadgeText({
  text: 'ext'
});
chrome.storage.local.get(['timer','timerState'],(lsData)=>{
});
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
});
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(['timer','timerState'],(lsData)=>{
  });
});
chrome.windows.onRemoved.addListener((windowId) => {
  chrome.storage.local.set({
    timerState:timerState,
    timer:{totalTime:totalTime,startSeconds:startSeconds,startTimeInMS:startTimeInMS}
  });
});