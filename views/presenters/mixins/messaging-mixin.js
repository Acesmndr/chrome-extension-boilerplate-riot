const messageMixin = {
  setupListener: (e) => {
    chrome.runtime.onMessage.addListener((request) => {
      if (e.isMounted === false) {
        return;
      }
      switch (request.type) {
        case 'update':
        console.log('update request',request.data);
          e.update(request.data);
          break;
        case 'route':
          e.unmount(true);
          console.log('route', request.state);
          e.mountView(request.state.page, request.opts);
          break;
        default:
      }
    });
  },
  sendMessage: (msg, callback = () => {}) => {
    chrome.runtime.sendMessage(msg, callback);
  },
  notify: (params, callback) => {
    chrome.notifications.create(params.id || 'cftimer', {
      type: 'basic',
      title: params.title || '',
      message: params.message || '',
      buttons: params.buttons ? [{ title: 'Yes' }, { title: 'No' }] : [],
      requireInteraction: false,
      iconUrl: 'assets/img/icon.png',
    }, callback);
  },
  mountView: (view, options = {}) => {
    riot.mount('.main-body', view, options);
  },
};
riot.mixin('messageMixin', messageMixin);
