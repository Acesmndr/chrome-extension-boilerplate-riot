import * as riot from 'riot';
import pagetwo from '../pagetwo/pagetwo.riot';
import route from '../../plugins/route';
import * as chromeUtils from '../../../chrome/chrome-utils';

riot.register('pagetwo', pagetwo);
riot.install(route);

describe('Page two specs', () => {
  const pageElement = document.createElement('div');
  const mockFn = jest.fn();
  let mountedComponent;

  beforeAll(() => {
    pageElement.id = 'root';
    document.body.appendChild(pageElement);

    chromeUtils.sendMessage = mockFn;
    mountedComponent = riot.mount(pageElement, {}, 'pagetwo');
  });

  afterEach(() => {
    chromeUtils.sendMessage.mockReset();
  });

  afterAll(() => {
    chromeUtils.sendMessage.mockRestore();
  })


  it('should fetch the data in onBeforeMount function', () => {
    expect(chromeUtils.sendMessage.mock.calls.length).toBe(1);
    expect(chromeUtils.sendMessage.mock.calls[0]).toEqual([{
      type: 'getDataFromBackground',
      query: 'todolist'
    }]);
  });
  
  it('should mount the tag', () => {
    expect(document.querySelector('#root')).toMatchSnapshot();
  });


  it('should have a title text', () => {
    expect(document.querySelector('.form .title').textContent).toBe('To Do');
  });

  it('should have a input text field', () => {
    expect(document.querySelectorAll('input[type="text"]').length).toBe(1);
  });

  it('should add an item on todo list', () => {
    document.querySelector('input[type="text"]').value = "wonderwoman";
    const addButton = document.querySelector('input[type="button"][value="+"]');
    addButton.click();
    
    expect(chromeUtils.sendMessage.mock.calls.length).toBe(1);
    expect(chromeUtils.sendMessage.mock.calls[0]).toEqual([{
      type: 'saveDataInBackground',
      data: { todolist: ['wonderwoman'] },
    }]);
  });

  it('should remove an item on todo list', () => {
    mountedComponent[0].state = {
      todolist: ['batman', 'superman'],
      containsItem: true,
    }
    mountedComponent[0].removeItem({
      target: {
        getAttribute: (attr) => {
          if(attr === 'itemNo') {
            return '1';
          }
          return undefined;
        }
      }
    });

    expect(chromeUtils.sendMessage.mock.calls.length).toBe(1);
    expect(chromeUtils.sendMessage.mock.calls[0]).toEqual([{
      type: 'saveDataInBackground',
      data: { todolist: ['batman'] },
    }]);
  });

  it('should send a clear request on clearAll button click', () => {
    const clearButton = document.querySelector('input[type="button"][value="Clear All"]');
    clearButton.click();
    
    expect(chromeUtils.sendMessage.mock.calls.length).toBe(1);
    expect(chromeUtils.sendMessage.mock.calls[0]).toEqual([{
      type: 'removeAllDataInBackground',
    }]);
  });

  it('should route to second page when route button is pressed', () => {
    const routeButton = document.querySelector('input[type="button"][value="Return to page 1"]');
    const mockFn = jest.fn();

    riot.mount = mockFn;
    routeButton.click();

    expect(riot.mount.mock.calls.length).toBe(1);
    expect(riot.mount.mock.calls[0]).toEqual([pageElement, {}, "pageone"]);

    riot.mount.mockRestore();
  })
});