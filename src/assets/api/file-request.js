import * as baseRequestApi from './base-request-api';

const getFile = (url, callback) => {
  baseRequestApi.request('GET', url, {}, (response) => {
    callback(response);
  });
}

export { getFile };