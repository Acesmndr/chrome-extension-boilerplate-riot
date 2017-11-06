/* global chrome */
clearCache = () => {
  chrome.storage.local.clear();
}

fetch = (getWhat, callback) => {
  chrome.storage.local.get(getWhat,(lsData) => {
    callback(data);
  });
};

notify = (params, stopSpinner) => {
  chrome.notifications.create({
    type: 'basic',
    title: params.title || 'Chrome Extension',
    message: params.message || '',
    buttons: params.buttons ? [{ title: 'Yes' }, { title: 'No' }] : [],
    requireInteraction: false,
    iconUrl: 'assets/img/icon.png',
  }, () => {
  });
}

sendMessage = (msg) => {
  chrome.runtime.sendMessage(msg, () => {
  });
}

setBadgeIcon = (iconPath) => {
  chrome.browserAction.setIcon({path: iconPath});
}

setBadgeText = (text = 'ext') => {
  chrome.browserAction.setBadgeText({
    text: text,
  });
};

setupContextMenu = (reset) => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({ id: 'reset_extension', title: 'Reset extension', contexts: ['browser_action'] });
    chrome.contextMenus.onClicked.addListener((info) => {
      if (info.menuItemId === 'reset_extension') {
        reset();
      }
    });
  });
}

setupStartup = (callback) => {
  chrome.runtime.onStartup.addListener(() => {
    callback();
  });
}

store = (dataObj, callback = () => {}) => {
  chrome.storage.local.set(dataObj, callback);
}

export {
  clearCache,
  fetch,
  notify,
  sendMessage,
  setBadgeIcon,
  setBadgeText,
  setupContextMenu,
  setupStartup,
  store,
}

