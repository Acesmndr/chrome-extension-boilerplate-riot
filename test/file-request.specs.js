/* global define, it, describe, before, after, beforeEach, afterEach */
import { assert } from 'chai';
import sinon from 'sinon';
import * as baseApi from '../src/assets/api/base-request-api';
import * as fileRequest from '../src/assets/api/file-request';

const URL = 'http://acesmndr.io/file';
describe('File Request module', () => {
    before(() => {
        sinon.stub(baseApi, 'request');
    });
    afterEach(() => {
        baseApi.request.reset();
    });
    after(() => {
        baseApi.request.restore();
    });
    describe('getFile function', () => {
        it('should do a GET request to the url', () => {
            fileRequest.getFile(URL, () => { });
            assert.ok(baseApi.request.calledWith('GET', 'http://acesmndr.io/file', {}));
        });
    });
});