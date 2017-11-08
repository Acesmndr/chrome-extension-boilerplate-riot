this.todolist = opts.data || [];
this.goToFirstPage = () => {
  riot.mount('.main-body', 'pageone');
}

this.addItem = () => {
  const item = this.refs.nameInput.value;
  if (item === '') {
    return;
  }
  this.todolist.push(item);
  this.sendMessage({
    type: 'saveDataInBackground',
    data: {todolist: this.todolist},
  });
  this.refs.nameInput.value = '';
}

this.clearAll = () => {
  this.todolist = [];
  this.sendMessage({
    type: 'removeAllDataInBackground',
  });
}

this.removeItem = (e) => {
  console.log(e);
  this.todolist.splice(e.item.i, 1);
  this.sendMessage({
    type: 'saveDataInBackground',
    data: {todolist: this.todolist},
  });
}

this.on('mount', () => {
  this.mixin('messageMixin');
  this.setupListener(this);
  this.sendMessage({
    type: 'getDataFromBackground',
    query: 'todolist'
  });
});

this.on('unmount', () => {
  console.log('Page 2 got unmounted');
});