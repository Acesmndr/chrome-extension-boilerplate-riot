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

chromeUtils.setupContextMenu(() => { reset(); });

export {
  getData,
  reset,
  saveData,
}