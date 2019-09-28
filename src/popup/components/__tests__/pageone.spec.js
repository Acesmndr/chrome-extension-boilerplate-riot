import * as riot from 'riot';
import pageone from '../pageone/pageone.riot';
import route from '../../plugins/route';
import * as chromeUtils from '../../../chrome/chrome-utils';

riot.register('pageone', pageone);
riot.install(route);

describe('Page one specs', () => {
    const pageElement = document.createElement('div');
    beforeAll( () => {
        pageElement.id = 'root';
        document.body.appendChild(pageElement)

        riot.mount(pageElement, {}, 'pageone');
    });
    
    
    it('should mount the tag', () => {
        expect(document.querySelector('#root')).toMatchSnapshot();
    });

    it('should have a title', () => {
        expect(document.querySelector('.graphic .title').textContent).toBe('Riot Chrome Extension Boilerplate');
    });
    
    it('should have the author field', () => {
        expect(document.querySelector('.graphic .author').textContent).toBe('acesmndr@gmail.com');
    });

    it('should have two buttons', () => {
        expect(document.querySelectorAll('input[type="button"]').length).toBe(2);
    });

    it('should send an ajax request on click', () => {
        const reqButton = document.querySelector('input[type="button"][value="Send Data Request"]');
        const mockFn = jest.fn();

        chromeUtils.sendMessage = mockFn;
        reqButton.click();

        expect(chromeUtils.sendMessage.mock.calls.length).toBe(1);
        expect(chromeUtils.sendMessage.mock.calls[0]).toEqual([{ type: 'sendAjaxRequest' }]);

        chromeUtils.sendMessage.mockRestore();
    });

    it('should route to second page when route button is pressed', () => {
        const routeButton = document.querySelector('input[type="button"][value="Go to page 2"]');
        const mockFn = jest.fn();

        riot.mount = mockFn;
        routeButton.click();

        expect(riot.mount.mock.calls.length).toBe(1);
        expect(riot.mount.mock.calls[0]).toEqual([pageElement, {}, "pagetwo"]);

        riot.mount.mockRestore();
    })
});
