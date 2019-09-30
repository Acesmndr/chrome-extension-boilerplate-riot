// add listener to the app
export default function (component) {
  chrome.runtime.onMessage.addListener((request) => {
    if (component.isMounted === false) {
      return component;
    }
    switch (request.type) {
      case 'update':
        console.log('Update request:', request.data);
        component.update(request.data);
        break;
      case 'route':
        console.log('Route:', request.data);
        component.route(request.data.page, request.data.options);
        break;
      default:
    }
    return false;
  });

  return component;
}