/* global window */
import * as chromeUtils from '../../chrome/chrome-utils';
import * as fileRequest from '../api/file-request';

const getData = (whatToFetch) => {
  chromeUtils.fetch(whatToFetch).then((storeData) => {
    chromeUtils.sendMessage({ type: 'update', data: { todolist: storeData[whatToFetch], containsItem: !!storeData[whatToFetch].length} });
  }).catch((error) => {
    reject(error);
  });
}

const reset = () => {
  chromeUtils.clearCache();
}

const saveData = (whatToStore) => {
  return new Promise((resolve, reject) => {
    chromeUtils.store(whatToStore).then(() => {
      resolve();
    }).catch((error) => {
      reject();
    });
  });
}

const sendAjaxRequest = (url) => {
  return new Promise((resolve, reject) => {
    fileRequest.getFile(url).then((response) => {
      resolve(response);
      chromeUtils.notify({title:'Background AJAX request successful', message:JSON.stringify(response)});
    }).catch((error) => {
      reject(error);
    });
  });
}

chromeUtils.setupContextMenu(() => { reset(); });

export {
  getData,
  reset,
  saveData,
  sendAjaxRequest,
}