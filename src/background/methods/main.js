import * as fileRequest from '../api/file-request';
import * as chromeUtils from '../../chrome/chrome-utils';

/* gets the data from chrome local storage and dispatches a message to popup */
const getData = (whatToFetch) => {
  chromeUtils.fetch(whatToFetch).then((storeData) => {
    chromeUtils.sendMessage({
      type: 'update',
      data: {
        todolist: storeData[whatToFetch],
        containsItem: !!storeData[whatToFetch].length
      }
    });
  }).catch((error) => {
    reject(error);
  });
}

/* clears local storage */
const reset = () => {
  chromeUtils.clearCache();
}

/* saves data in local storage and returns a promise */
const saveData = (whatToStore) => {
  return new Promise((resolve, reject) => {
    chromeUtils.store(whatToStore).then(() => {
      resolve();
    }).catch((error) => {
      reject();
    });
  });
}

/* sends an ajax request and resolves with the data as well as triggers a notification */
const sendAjaxRequest = (url) => {
  return new Promise((resolve, reject) => {
    fileRequest.getFile(url).then((response) => {
      resolve(response);
      chromeUtils.notify({
        title:'Background AJAX request successful',
        message:JSON.stringify(response)
      });
    }).catch((error) => {
      reject(error);
    });
  });
}

/* sets up a context menu with reset function */
chromeUtils.setupContextMenu(() => { reset(); });

export {
  getData,
  reset,
  saveData,
  sendAjaxRequest,
}