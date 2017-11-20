import * as riot from 'riot';
import pageone from '../pageone.tag';

const messageMixin = {
    setupListener: (e) => jest.fn(),
    sendMessage: (msg, callback = () => { }) => jest.fn(),
    notify: (params, callback) => jest.fn(),
}; 
describe('hello', () => {
    beforeAll( () => {
        riot.mixin('messageMixin', messageMixin);
        // create mounting point 
        const elem = document.createElement('pageone');
        document.body.appendChild(elem)
        riot.mount(elem, 'pageone');
    });
  
    it('should mount the tag', () => {
        expect(document.querySelector('pageone')).toMatchSnapshot();
        expect(document.querySelector('.graphic .huge').textContent).toBe('RIOT CHROME EXTENSION BOILERPLATE');
    });

});