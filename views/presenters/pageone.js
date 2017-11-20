this.goToSecondPage = () => {
  riot.mount('.main-body', 'pagetwo');
}

this.getAjaxDataFromBackground = () => {
  this.sendMessage({ type: 'sendAjaxRequest' });
}

this.on('mount', () => {
  this.mixin('messageMixin');
  this.setupListener(this);
});
