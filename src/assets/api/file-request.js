import * as baseRequestApi from './base-request-api';

// Get project detail for specific project
const getFile = (url, callback) => {
  // obj = {projectId: '', credentials: {}}
  baseRequestApi.request('GET', url, {}, (response) => {
    callback(response);
  });
}

export { getFile };