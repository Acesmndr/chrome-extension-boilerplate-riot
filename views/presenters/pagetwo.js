this.todolist = opts.data || [];
this.containsItem = !!this.todolist.length;
this.goToFirstPage = () => {
  riot.mount('.main-body', 'pageone');
}

this.addItem = () => {
  const item = this.refs.nameInput.value;
  if (item === '') {
    return;
  }
  this.update({
    todolist: [...this.todolist, item],
    containsItem: true,
  });
  this.sendMessage({
    type: 'saveDataInBackground',
    data: {todolist: this.todolist},
  });
  this.refs.nameInput.value = '';
}

this.clearAll = () => {
  this.update({
    todolist: [],
    containsItem: false
  });
  this.sendMessage({
    type: 'removeAllDataInBackground',
  });
}

this.removeItem = (e) => {
  let itemList = this.todolist;
  itemList.splice(e.item.i, 1);
  this.update({
    todolist: itemList,
    containsItem: !!itemList.length, 
  });
  this.sendMessage({
    type: 'saveDataInBackground',
    data: {todolist: itemList},
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