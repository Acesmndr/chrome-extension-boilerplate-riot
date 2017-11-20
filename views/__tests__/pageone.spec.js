import * as riot from 'riot';
import pageone from '../pageone.tag';

const mockFn = jest.fn();
const messageMixin = {
    setupListener: (e) => new mockFn(e),
    sendMessage: (msg, callback = () => {}) => new mockFn(msg),
    notify: (params, callback) => new mockFn(params, callback),
}; 
describe('Page one specs', () => {
    beforeAll( () => {
        expect(mockFn.mock.calls.length).toBe(0);
        riot.mixin('messageMixin', messageMixin);
        // create mounting point 
        const elem = document.createElement('div');
        elem.className = "main-body";
        document.body.appendChild(elem)
        riot.mount(elem, 'pageone');
    });
    
    
    it('should mount the tag', () => {
        expect(document.querySelector('.main-body')).toMatchSnapshot();
    });
    
    it('should setup a listener on mount', () => {
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('should have a title text', () => {
        expect(document.querySelector('.graphic .huge').textContent).toBe('RIOT CHROME EXTENSION BOILERPLATE');
        expect(document.querySelector('.graphic .medium').textContent).toBe('-acesmndr');
    });

    it('should have two buttons', () => {
        expect(document.querySelectorAll('input[type="button"]').length).toBe(2);
    });

    it('should send an ajax request on click', () => {
        const reqButton = document.querySelectorAll('input[type="button"]')[0];
        reqButton.click();
        expect(mockFn.mock.calls.length).toBe(2);
        expect(mockFn.mock.calls[1]).toEqual([{ type: 'sendAjaxRequest' }]);
    });

    it('should call a mount function to mount the second page', () => {
        riot.mount = (where, what) => new mockFn(where, what);
        const routeButton = document.querySelectorAll('input[type="button"]')[1];
        routeButton.click();
        expect(mockFn.mock.calls.length).toBe(3);
        expect(mockFn.mock.calls[2]).toEqual(['.main-body', 'pagetwo']);
    });

});