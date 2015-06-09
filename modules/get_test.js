var assert = require('chai').assert
	, get = require('./get')
	, httpStub = require('./httpStub')
	, stubData = require('../test_stubs/data')

	, configStub = {
				key: 'keyIn'
				, token: 'tokenIn'
				, host: undefined
				, version: 'v1'
				, http: httpStub(stubData)
			};

describe('get module tests', function () {
	'use strict';

	it('should be properly defined', function () {
		assert.isFunction(get);
	});

	it('should return a function', function () {
		assert.isFunction(get(configStub));
	});

	it('should return an object when an ID is passed in', function (done) {
		get(configStub)('test1', function (doc) {
			assert.isObject(doc);
			assert.strictEqual(doc._id, 'test1');
			done();
		});
	});	

	it('should return an array when no ID is passed in', function (done) {
		get(configStub)(function (docs) {
			assert.isArray(docs);
			done();
		});
	});	
});