/* global window */
import * as chromeUtils from './chrome-utilities';
import * as fileRequest from './api/file-request';

const getData = (whatToFetch) => {
  chromeUtils.fetch(whatToFetch).then((storeData) => {
    chromeUtils.sendMessage({ type: 'update', data:{todolist: storeData[whatToFetch]} });
  });
}

const reset = () => {
  chromeUtils.clearCache();
}

const saveData = (whatToStore) => {
  return new Promise((resolve, reject) => {
    chromeUtils.store(whatToStore).then(() => {
      resolve();
    });
  });
}

const sendAjaxRequest = (url) => {
  fileRequest.getFile(url).then((response) => {
    chromeUtils.notify({title:'Background AJAX request successful', message:JSON.stringify(response)});
  })
}

chromeUtils.setupContextMenu(() => { reset(); });

export {
  getData,
  reset,
  saveData,
  sendAjaxRequest,
}