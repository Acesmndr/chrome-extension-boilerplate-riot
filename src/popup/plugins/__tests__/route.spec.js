import * as riot from 'riot';
import route from '../route';

riot.register('page', riot.component('<page/>'));
riot.register('pagetwo', riot.component('<pagetwo/>'));

describe('Route specs', () => {
  const pageElement = document.createElement('div');
  let mountedComponent;

  beforeAll(() => {
    riot.install(route);
    pageElement.id = 'root';
    document.body.appendChild(pageElement)

    mountedComponent = riot.mount(pageElement, {}, 'page');
  });

  it('should call the unmount when the route function is called', () => {
    const mockFn = jest.fn();

    riot.unmount = mockFn;
    mountedComponent[0].route('pagetwo');

    expect(riot.unmount.mock.calls.length).toBe(1);
    expect(riot.unmount.mock.calls[0]).toEqual([pageElement, true]);

    riot.unmount.mockRestore();
  });

  it('should mount new page when the route function is called', () => {
    const mockFn = jest.fn();

    riot.mount = mockFn;
    mountedComponent[0].route('pagetwo');

    expect(riot.mount.mock.calls.length).toBe(1);
    expect(riot.mount.mock.calls[0]).toEqual([pageElement, {}, 'pagetwo']);

    riot.mount.mockRestore();
  });
});
