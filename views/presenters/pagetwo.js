this.goToFirstPage = () => {
  riot.mount('.main-body', 'pageone');
}

this.on('mount', () => {
  this.mixin('messageMixin');
  this.setupListener(this);
  chrome.runtime.sendMessage({
    type: 'getDataFromBackground',
  });
});

this.on('unmount', () => {
  console.log('Blank got unmounted');
});