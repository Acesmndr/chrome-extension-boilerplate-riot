import * as riot from 'riot';

import './style/index.scss';
import route from './plugins/route';
import listener from './plugins/listener';
import pageone from './components/pageone/pageone.riot';
import pagetwo from './components/pagetwo/pagetwo.riot';

// Install plugins to be accessible in each components
riot.install(route);
riot.install(listener);

// Register components to be globally accessible
riot.register('pageone', pageone);
riot.register('pagetwo', pagetwo);

// Mount pageone at the start
riot.mount(document.getElementById('root'), {}, 'pageone');

/*
  If you don't want components to be globally accessed you can run mount by using riot.component
    const mountApp = riot.component(pageone);
    const app = mountApp(document.getElementById('root'), {});
*/
