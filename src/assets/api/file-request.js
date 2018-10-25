import * as baseRequestApi from './base-request-api';

const getFile = (url) => {
  return new Promise((resolve, reject) => {
    baseRequestApi.request('GET', url, {}).then((response) => {
      resolve(response);
    }).catch(() => {
      reject();
    });
  });
}

export { getFile };