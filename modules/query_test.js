var assert = require('chai').assert
	, query = require('./query')
	, httpStub = require('./httpStub')
	, stubData = require('../test_stubs/data')

	, configStub = {
				key: 'keyIn'
				, token: 'tokenIn'
				, host: undefined
				, version: 'v1'
				, http: httpStub(stubData)
			};

describe('query module tests', function () {
	'use strict';

	it('should be properly defined', function () {
		assert.isFunction(query);
	});

	it('should return a function', function () {
		assert.isFunction(query(configStub));
	});

	it('should execute a filter function if a filter function is passed in', function (done) {
		var filter = function (item) {
			return item.tags.indexOf('security') > -1;
		};

		query(configStub)([{
			type: 'filter'
			, body: filter.toString()
		}], function (doc) {
			assert.isArray(doc);
			assert.lengthOf(doc, 4);
			done();
		});
	});	

	it('should execute the erroCallBack if something other then an array is passed in', function (done) {
		query(configStub)({}, function (docs) {
			
		}, function (err) {
			assert.strictEqual(true, true);
			done();
		});
	});	

	it('should execute the erroCallBack if a non 200 level response status');	
});