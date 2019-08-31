import * as riot from 'riot';

export default {
  route(page) {
    riot.unmount(document.getElementById('root'), true);
    riot.mount(document.getElementById('root'), {}, page);
  }
}
