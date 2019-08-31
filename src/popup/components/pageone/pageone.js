import helper from '../../helper';

export default {
  state: {
    message: 'Hello there'
  },
  onBeforeMount(props, state) {
    console.assert(this.state === state) // ok!
    console.log(state.message) // Hello there
  },
  goToSecondPage() {
    helper.route('pagetwo');
  },
  onMounted() {
    // debugger;
    // riot.mount('pagetwo');
  }
}
