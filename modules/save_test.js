var assert = require('chai').assert
	, save = require('./save')
	, httpStub = require('./httpStub')
	, stubData = require('../test_stubs/data')

	, configStub = {
				key: 'keyIn'
				, token: 'tokenIn'
				, host: undefined
				, version: 'v1'
				, http: httpStub(stubData)
			};

describe('save module tests', function () {
	'use strict';

	it('should be properly defined', function () {
		assert.isFunction(save);
	});

	it('should return a function', function () {
		assert.isFunction(save(configStub));
	});

	// it('should return an object when an ID is passed in', function (done) {
	// 	save(configStub)('test1', function (doc) {
	// 		assert.isObject(doc);
	// 		assert.strictEqual(doc._id, 'test1');
	// 		done();
	// 	});
	// });	

	// it('should return an array when no ID is passed in', function (done) {
	// 	save(configStub)(function (docs) {
	// 		assert.isArray(docs);
	// 		done();
	// 	});
	// });	
});