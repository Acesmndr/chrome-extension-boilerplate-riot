/* global define, it, describe, before, after, beforeEach, afterEach */
import { assert } from 'chai';
import sinon from 'sinon';
import * as baseApi from '../src/assets/api/base-request-api';

let server;
const xhr = sinon.useFakeXMLHttpRequest();
global.XMLHttpRequest = xhr;
describe('Base Api Request module', () => {
    beforeEach(() => {
        server = sinon.fakeServer.create();
        server.respondImmediately = true;
    });
    afterEach(() => {
        server.restore();
        chrome.flush();
    });
    describe('request function', () => {
        it('should set the error and return error response object if the response status is invalid', () => {
            server.respond('GET', 'url', [404, { 'Content-Type': 'application/json' }, JSON.stringify('Not Found')]);
            baseApi.request('GET', 'url', {}).then((response) => {
                assert.deepEqual(response, { status: 404, error: true });
                done();
            });
        });
        it('should send response object if the response status is 200', (done) => {
            server.respond('GET', 'url', [200, { 'Content-Type': 'application/json' }, JSON.stringify('responseText')]);
            baseApi.request('GET', 'url', {}).then((response) => {
                assert.deepEqual(response, { status: 200, responseObj: 'responseText' });
                done();
            });
        });
    });
});
