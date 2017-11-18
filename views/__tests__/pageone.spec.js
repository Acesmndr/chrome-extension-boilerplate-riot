import * as riot from 'riot';
import pageone from '../pageone.tag';
 
describe('hello', () => {
    beforeAll( () => {
        riot.mixin('messageMixin', {
            setupListener: (e) => {
                console.log('');
            }
        })
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