import * as riot from 'riot';

import './style/index.scss';
import pageone from './components/pageone/pageone.riot';
import pagetwo from './components/pagetwo/pagetwo.riot';

riot.register('pageone', pageone);
riot.register('pagetwo', pagetwo);

riot.mount(document.getElementById('root'), {}, 'pageone');

// const mountApp = riot.component(pageone);
// const app = mountApp(document.getElementById('root'), {});
