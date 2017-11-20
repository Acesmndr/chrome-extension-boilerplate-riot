/* global define, it, describe, before, after, beforeEach, afterEach */
import { assert } from 'chai';
import sinon from 'sinon';
import * as baseApi from '../src/assets/api/base-request-api';

const xhr = sinon.useFakeXMLHttpRequest();
const requests = [];
xhr.onCreate = (xhrObj) => {
    requests.push(xhrObj);
};
describe('Base Api Request module', () => {
    before(() => {
        global.BASE_URL = 'acesmndr.io/';
        global.XMLHttpRequest = xhr;
    });
    afterEach(() => {
        chrome.flush();
    });
    describe('request function', () => {
        it('should send response object if the response status is 200', () => {
            const callback = sinon.spy();
            baseApi.request('GET', 'url', {}, callback);
            requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify('responseText'));
            assert.ok(callback.calledWith({ status: 200, responseObj: 'responseText' }));
        });
        it('should set the error and return error response object if the response status is invalid', () => {
            const callback = sinon.spy();
            baseApi.request('GET', 'url', {}, callback);
            requests[1].respond(404, { 'Content-Type': 'application/json' }, JSON.stringify('Not Found'));
            assert.ok(callback.calledWith({ status: 404, error: true }));
        });
    });
});
