var assert = require('chai').assert
	, remove = require('./remove')
	, httpStub = require('./httpStub')
	, stubData = require('../test_stubs/data')

	, configStub = {
				key: 'keyIn'
				, token: 'tokenIn'
				, host: undefined
				, version: 'v1'
				, http: httpStub(stubData)
			};

describe('remove module tests', function () {
	'use strict';

	it('should be properly defined', function () {
		assert.isFunction(remove);
	});

	it('should return a function', function () {
		assert.isFunction(remove(configStub));
	});

	it('should remove a doc and return true when a valid ID is passed in', function (done) {
		remove(configStub)('test1', function (doc) {

			assert.isObject(doc);
			assert.strictEqual(doc.success, true);
			done();
		});
	});

	it('should not remove a doc and return false when an invalid ID is passed in', function (done) {
		remove(configStub)('test', function (doc) {
			
			assert.isObject(doc);
			assert.strictEqual(doc.success, false);
			done();
		});
	});
});