var assert = require('chai').assert
	, httpStub = require('./httpStub')
	, stubData = require('../test_stubs/data');

describe('http stub tests', function () {
	'use strict';

	it('should be properly defined', function () {
		assert.isFunction(httpStub);
		assert.isFunction(httpStub({}).request);
	});

	it('the stub request funciton should trigger the call back passing it a response stub', function (done) {

		var req = httpStub({}).request({}, function (res){			
			assert.isFunction(res.setEncoding);
			assert.isFunction(res.on);
			assert.strictEqual(res.statusCode, 200);
			done();
		});
	});

	it('request should return a request stub', function () {

		var req = httpStub({}).request({}, function (res){});
		
		assert.isFunction(req.on);
		assert.isFunction(req.end);
	});	

});