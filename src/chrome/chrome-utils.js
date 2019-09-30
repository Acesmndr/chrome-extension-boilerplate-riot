/* global chrome */
const clearCache = () => {
  return new Promise((resolve) => {
    chrome.storage.local.clear(() => {
      resolve();
    });
  });
}

/* fetch returns a promise which resolves with the data from storage */
const fetch = (getWhat) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(getWhat,(data) => {
      resolve(data);
    });
  });
}

/* triggers a chrome notification */
const notify = (params) => {
  return new Promise((resolve) => {
    chrome.notifications.create({
      type: 'basic',
      title: params.title || 'Chrome Extension',
      message: params.message || '',
      buttons: params.buttons ? [{ title: 'Yes' }, { title: 'No' }] : [],
      requireInteraction: false,
      iconUrl: 'assets/img/icon.png',
    }, resolve);
  });
}

/* dispatch a message to listeners in background or popup */
const sendMessage = (msg) => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(msg);
    resolve();
  });
}

/* sets the browser action icon */
const setBadgeIcon = (iconPath) => {
  chrome.browserAction.setIcon({path: iconPath});
}

/* 
  sets the browser action badge text
  only four characters are visible
*/
const setBadgeText = (text = 'ext') => {
  chrome.browserAction.setBadgeText({
    text: text,
  });
}

/*
  sets up the context menu of the browser action
*/
const setupContextMenu = (reset) => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({ id: 'reset_extension', title: 'Reset extension', contexts: ['browser_action'] });
    chrome.contextMenus.onClicked.addListener((info) => {
      if (info.menuItemId === 'reset_extension') {
        reset();
      }
    });
  });
}

/* on browser startup returns a promise */
const setupStartup = () => {
  return new Promise((resolve, reject) => {
    chrome.runtime.onStartup.addListener(() => {
      resolve();
    });
  });
}

/* stores a data in the local storage */
const store = (dataObj) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(dataObj, resolve);
  });
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

