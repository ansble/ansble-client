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

	it('request should remove items from the stubs when a delete is sent', function (done) {

		var http = httpStub([
				{
					_id: 'test1'
					, value: true
				}
				, {
					_id: 'test2'
					, value: false
				}
			])
			, req2
			, req1 = http.request({
				method: 'DELETE'
				, path: '/api/v1/keyIn/test1'
			}, function (res){
				var doc = '';

				res.setEncoding('utf8');

				res.on('data', function(data){
					doc += data;
				});

				res.on('end', function() {
					doc = JSON.parse(doc);
					assert.isObject(doc);
					assert.strictEqual(doc.success, true);

					req2 = http.request({ hostname: undefined,
					    port: undefined,
					    path: '/api/v1/keyIn',
					    method: 'GET',
					    headers: { Authorization: 'tokenIn' } 
					}, function (res2){
						var doc2 = '';

						res2.setEncoding('utf8');

						res2.on('data', function(data){
							doc2 += data;
						});

						res2.on('end', function (){
							doc2 = JSON.parse(doc2);

							assert.strictEqual(doc2.length, 1);
							done();
						});
						
					});
					
					req2.end();
				});
			});

		req1.end();
	});

});