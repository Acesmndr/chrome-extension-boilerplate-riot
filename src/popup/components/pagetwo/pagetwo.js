import { sendMessage } from '../../../chrome/chrome-utils';

export default {
  state: {
    todolist: [],
    containsItem: false,
  },
  addItem() {
    const item = this.$('input[type="text"]').value;
    if (item === '') {
      return;
    }
    sendMessage({
      type: 'saveDataInBackground',
      data: { todolist: [...this.state.todolist, item] },
    });
    this.$('input[type="text"]').value = '';
  },
  removeItem(e) {
    let itemList = this.state.todolist;
    itemList.splice(Number(e.target.getAttribute('itemNo')), 1);
    sendMessage({
      type: 'saveDataInBackground',
      data: { todolist: itemList },
    });
  },
  clearAll() {
    sendMessage({
      type: 'removeAllDataInBackground',
    })
  },
  goToFirstPage() {
    this.route('pageone');
  },
  onBeforeMount(props, state) {
    sendMessage({
      type: 'getDataFromBackground',
      query: 'todolist'
    });
  },
  onBeforeUpdate(props, state) {
    state = {
      todolist: props.todolist || [],
      containsItem: props.containsItem || false,
    }
    console.log('state updated to:', state);
  }
}
