import * as riot from 'riot';
import pagetwo from '../pagetwo.tag';

const mockFn = jest.fn();
const messageMixin = {
    setupListener: (e) => new mockFn(e),
    sendMessage: (msg, callback = () => {}) => new mockFn(msg),
    notify: (params, callback) => new mockFn(params, callback),
}; 
describe('Page two specs', () => {
    beforeAll( () => {
        expect(mockFn.mock.calls.length).toBe(0);
        riot.mixin('messageMixin', messageMixin);
        // create mounting point 
        const elem = document.createElement('div');
        elem.className = "main-body";
        document.body.appendChild(elem)
        const opts = { data: ['batman', 'superman'] };
        riot.mount(elem, 'pagetwo', opts);
    });
    
    
    it('should mount the tag', () => {
        expect(document.querySelector('.main-body')).toMatchSnapshot();
    });
    
    it('should setup a listener on mount', () => {
        expect(mockFn.mock.calls.length).toBe(2);
    });

    it('should have a title text', () => {
        expect(document.querySelector('.form .title').textContent).toBe('To Do App');
    });

    it('should have a input text field', () => {
        expect(document.querySelectorAll('input[type="text"]').length).toBe(1);
    });

    it('should have two fields set with opts recieved', () => {
        expect(document.querySelectorAll('ul li').length).toBe(2);
    });

    it('should remove an item from todo list on click', () => {
      const firstUl = document.querySelectorAll('ul li')[0];
      firstUl.click();
      expect(document.querySelectorAll('ul li').length).toBe(1);
      expect(mockFn.mock.calls.length).toBe(3);
      expect(mockFn.mock.calls[2]).toEqual([{ type: 'saveDataInBackground', data: {todolist: ['superman']} }]);
    });

    it('should add an item on todo list', () => {
      expect(document.querySelectorAll('ul li').length).toBe(1);
      document.querySelector('input[type="text"]').value="wonderwoman";
      const addButton = document.querySelectorAll('input[type="button"]')[0];
      addButton.click();
      expect(document.querySelectorAll('ul li').length).toBe(2);
      expect(mockFn.mock.calls.length).toBe(4);
      expect(mockFn.mock.calls[3]).toEqual([{ type: 'saveDataInBackground', data: {todolist: ['superman', 'wonderwoman']} }]);
    });
    
    it('should send a clear request on button click', () => {
        const clearButton = document.querySelectorAll('input[type="button"]')[1];
        clearButton.click();
        expect(mockFn.mock.calls.length).toBe(5);
        expect(mockFn.mock.calls[4]).toEqual([{ type: 'removeAllDataInBackground' }]);
    });

    it('should call a mount function to mount the first page on click', () => {
        riot.mount = (where, what) => new mockFn(where, what);
        const routeButton = document.querySelectorAll('input[type="button"]')[2];
        routeButton.click();
        expect(mockFn.mock.calls.length).toBe(6);
        expect(mockFn.mock.calls[5]).toEqual(['.main-body', 'pageone']);
    });


});