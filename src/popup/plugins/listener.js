// add listener to the app
export default function (component) {
  chrome.runtime.onMessage.addListener((request) => {
    if (component.isMounted === false) {
      return false;
    }
    switch (request.type) {
      case 'update':
        console.log('update request', request.data);
        component.update(request.data);
        break;
      case 'route':
        console.log('route', request.state);
        break;
      default:
    }
  });

  return component;
}