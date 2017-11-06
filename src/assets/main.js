/* global window */
import * as chromeUtils from './chrome-utilities';
import * as fileRequest from '../api/file-request';

chromeUtils.setupContextMenu(() => { reset(); });

getData = (whatToFetch) => {
  chromeUtils.fetch(whatToFetch, (data) => {
    chromeUtils.sendMessage({ type: 'route', data: data });
  });
}

reset = () => {
  chromeUtils.clearCache();
}

storeData = (whatToStore, callback = () => {}) => {
  chromeUtils.store(whatToStore, () => {
    callback();
  });
}

export {
  getData,
  reset,
  storeData,
}