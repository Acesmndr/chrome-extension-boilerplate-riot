/* global define, it, describe, beforeEach, afterEach, before, window */
import { assert } from 'chai';
import sinon from 'sinon';
import * as fileRequest from '../src/background/api/file-request';
import * as chromeUtils from '../src/chrome/chrome-utils';
import * as Main from '../src/background/methods/main';

const now = new Date();
let clock;
let XMLHttpRequest;
let responseObj = {};
describe('Common Methods', () => {
    before(() => {
        XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        const requests = [];
        XMLHttpRequest.onCreate = (req) => { requests.push(req); };
        chromeUtils.fetch = (params, callback) => {
            callback(responseObj);
        };
    });
    beforeEach(() => {
        global.BASE_URL = 'acesmndr.io';
        clock = sinon.useFakeTimers(now.getTime());
        chrome.flush();
    });
    afterEach(() => {
        responseObj = {};
        clock.restore();
    });
    describe('reset function', () => {
        it('should clear the local storage', () => {
            Main.reset();
            assert.ok(chrome.storage.local.clear.called, 'clears local storage');
        });
    });
    
    describe('sendAjaxRequest function', () => {
        it('should send an ajax request and display returned data in a notification', (done) => {
            sinon.stub(fileRequest, 'getFile');
            fileRequest.getFile.resolves({
                data: 'acesmndr'
            });
            const notifySpy = sinon.spy(chromeUtils, 'notify');
            Main.sendAjaxRequest('url').then(() => {
                assert.ok(fileRequest.getFile.calledOnce);
                assert.ok(notifySpy.calledOnce);
                assert.ok(notifySpy.calledWith({ title: 'Background AJAX request successful', message: '{"data":"acesmndr"}' }));
                notifySpy.restore();
                fileRequest.getFile.restore();
                done();
            });
        });
    });
    describe('getData function', () => {
        it('should get the data from the local storage', (done) => {
            sinon.stub(chromeUtils, 'fetch');
            chromeUtils.fetch.resolves({ key: 'value' });
            Main.getData('key');
            assert.ok(chromeUtils.fetch.calledWith('key'));
            chromeUtils.fetch.restore();
            done();
        });
    });
   describe('saveData function', () => {
        it('should store the data sent in local storage', () => {
            sinon.stub(chromeUtils, 'store');
            chromeUtils.store.resolves();
            Main.saveData({key: 'value'});
            assert.ok(chromeUtils.store.calledWith({ key: 'value' }));
            chromeUtils.store.restore();
        });
    });
});
