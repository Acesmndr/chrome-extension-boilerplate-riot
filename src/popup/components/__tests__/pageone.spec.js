import * as riot from 'riot';
import pageone from '../pageone/pageone.riot';

riot.register('pageone', pageone);

describe('Page one specs', () => {
    beforeAll( () => {
        const elem = document.createElement('div');
        elem.className = 'main-body';
        document.body.appendChild(elem)
        riot.mount(elem, {}, 'pageone');
    });
    
    
    it('should mount the tag', () => {
        expect(document.querySelector('.main-body')).toMatchSnapshot();
    });

    it('should have a title text', () => {
        expect(document.querySelector('.graphic .title').textContent).toBe('Riot Chrome Extension Boilerplate');
        expect(document.querySelector('.graphic .author').textContent).toBe('acesmndr@gmail.com');
    });

    it('should have two buttons', () => {
        expect(document.querySelectorAll('input[type="button"]').length).toBe(2);
    });
});