import * as baseApi from './base_api';

// Get project detail for specific project
function getFile(url, callback) {
  // obj = {projectId: '', credentials: {}}
  baseApi.request('GET', url, {}, (response) => {
    callback(response);
  });
}

export { getFile };