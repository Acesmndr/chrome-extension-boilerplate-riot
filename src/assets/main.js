/* global window */
import * as chromeUtils from './chrome-utilities';
import * as fileRequest from './api/file-request';

const getData = (whatToFetch) => {
  chromeUtils.fetch(whatToFetch, (data) => {
    chromeUtils.sendMessage({ type: 'update', data:{todolist: data[whatToFetch]} });
  });
}

const reset = () => {
  chromeUtils.clearCache();
}

const saveData = (whatToStore, callback = () => {}) => {
  chromeUtils.store(whatToStore, () => {
    callback();
  });
}

const sendAjaxRequest = () => {
  fileRequest.getFile('https://reqres.in/api/users', (data) => {
    chromeUtils.notify({title:'Background AJAX request successful', message:JSON.stringify(data)});
  })
}

chromeUtils.setupContextMenu(() => { reset(); });

export {
  getData,
  reset,
  saveData,
  sendAjaxRequest,
}