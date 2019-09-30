import * as chrome from 'sinon-chrome';
import * as riot from 'riot';

// mock global chrome for importing listener
global.chrome = chrome;

import listener from '../listener';

riot.register('page', riot.component('<page/>'));

describe('Route specs', () => {
  const pageElement = document.createElement('div');
  let mountedComponent;

  beforeAll(() => {
    riot.install(listener);
    pageElement.id = 'root';
    document.body.appendChild(pageElement)

    mountedComponent = riot.mount(pageElement, {}, 'page');
  });

  it('should update the state when the listener function is invoked', () => {
    expect(mountedComponent[0].state).toEqual({});
    
    chrome.runtime.onMessage.addListener.invokeCallback({
      type: 'update',
      data: {
        todolist: ['batman'],
        containsItem: true,
      }
    });

    expect(mountedComponent[0].state).toEqual({
      todolist: ['batman'],
      containsItem: true,
    });
  });

  it('should route when the listener function is invoked', () => {
    // create a route mock
    const route = (component) => {
      component.route = () => { };
      return component;
    };
    riot.install(route);

    mountedComponent[0].route = jest.fn();
    
    chrome.runtime.onMessage.addListener.invokeCallback({
      type: 'route',
      data: {
        page: 'pagetwo',
        options: {},
      }
    });

    expect(mountedComponent[0].route.mock.calls.length).toBe(1);
    expect(mountedComponent[0].route.mock.calls[0]).toEqual(['pagetwo', {}]);
  });

});
