/* global define, it, describe, beforeEach, afterEach */
import { assert } from 'chai';
import sinon from 'sinon';
import * as chromeUtils from '../src/chrome/chrome-utils';

describe('Chrome Utilities', () => {
    beforeEach(() => {
        chrome.flush();
    });
    describe('setup context menu function', () => {
        it('should remove all the context menus and append context menus', () => {
            chromeUtils.setupContextMenu(() => { }, () => { });
            assert.ok(chrome.contextMenus.removeAll.calledOnce);
        });
    });
    describe('set badge icon function', () => {
        it('should set the icon with the url sent ', () => {
            chromeUtils.setBadgeIcon('pathUrl');
            assert.ok(chrome.browserAction.setIcon.calledWith({ path: 'pathUrl' }));
        });
        it('should set the text with the message sent', () => {
            chromeUtils.setBadgeText('text');
            assert.ok(chrome.browserAction.setBadgeText.calledWith({ text: 'text' }));
        });
        it('should set the text with ext if no message is sent', () => {
            chromeUtils.setBadgeText();
            assert.ok(chrome.browserAction.setBadgeText.calledWith({ text: 'ext' }));
        });
    });
    describe('fetch function', () => {
        it('should call the local storage get function', () => {
            chromeUtils.fetch({ param: 'some_data' });
            assert.ok(chrome.storage.local.get.calledWith({ param: 'some_data' }));
        });
    });
    describe('store function', () => {
        it('should call the local storage set function', () => {
            chromeUtils.store({ param: 'some_data' });
            assert.ok(chrome.storage.local.set.calledWith({ param: 'some_data' }));
        });
    });
    describe('notify function', () => {
        it('should create a notification with message and title', () => {
            const params = {
                title: 'title',
                message: 'message'
            };
            chromeUtils.notify(params);
            assert.ok(chrome.notifications.create.calledWith({ type: 'basic', title: params.title, message: params.message, buttons: [], requireInteraction: false, iconUrl: 'assets/img/icon.png' }));
        });
    });
});
