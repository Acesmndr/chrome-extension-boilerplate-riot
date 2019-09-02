/*
  Simple Vanilla AJAX which can be replaced with axios or other custom AJAX handlers
*/

const isValidStatus = (status) => {
  return /^[2-3][0-9][0-9]$/.test(status);
}

const setContentTypeHeader = (obj) => {
  obj.setRequestHeader('Content-Type', 'application/json');
}

const parseResponse = (requestUrl, response) => {
  const responseStatus = response.status;
  const validStatus = isValidStatus(responseStatus);
  if (validStatus) {
    return {
      status: responseStatus,
      responseObj: JSON.parse(response.responseText)
    };
  }
  console.log('An error occurred');
  return {
    status: response.status,
    error: true
  };
}

export function request(type, requestUrl, data) {
  return new Promise((resolve, reject) => {
    const parsedRequestUrl = requestUrl;
    const requestObj = new XMLHttpRequest();
    requestObj.timeout = 15000;
    requestObj.open(type.toUpperCase(), parsedRequestUrl, true);
    setContentTypeHeader(requestObj);
    requestObj.onreadystatechange = () => {
      if (requestObj.readyState === 4) {
        resolve(parseResponse(requestUrl, requestObj));
      }
    };
    requestObj.onerror = () => {
      reject({
        status: requestObj.status,
        responseObj: JSON.parse(requestObj.responseText || 'An error occurred'),
      });
    }
    requestObj.send(JSON.stringify(data));
  });
}
