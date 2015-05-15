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

	// it('should return an object when an ID is passed in', function (done) {
	// 	remove(configStub)('test1', function (doc) {
	// 		assert.isObject(doc);
	// 		assert.strictEqual(doc._id, 'test1');
	// 		done();
	// 	});
	// });	

	// it('should return an array when no ID is passed in', function (done) {
	// 	remove(configStub)(function (docs) {
	// 		assert.isArray(docs);
	// 		done();
	// 	});
	// });	
});