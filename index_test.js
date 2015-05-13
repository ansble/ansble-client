var assert = require('chai').assert
	, client = require('./index')
	, stubData = require('./test_stubs/data');

describe('ansble client tests', function () {
	'use strict';

	describe('definition tests', function () {
		it('should export a setup function', function () {
			assert.isFunction(client);
		});

		it('should accept a token and key and then be properly defined', function () {
			var test = client('some-fake-key', 'some-fake-token-for-requests-and-api-usage');

			assert.isFunction(test.remove);
			assert.isFunction(test.get);
			assert.isFunction(test.save);
		});

		it('should throw an error if the token is not passed in', function () {
			try {
				client('some-fake-key');
				assert.strictEqual(true, false);
			} catch (e) {
				assert.strictEqual(e.message, 'token is required and must be a string');
			}
		});

		it('should throw an error if the key is not passed in', function () {
			try {
				client();
				assert.strictEqual(true, false);
			} catch (e) {
				assert.strictEqual(e.message, 'key is required and must be a string');
			}
		});
	});

	describe('data stub tests', function () {

		it('should return stubs when stubs are passed in', function (done) {
			var test = client('some-fake-key', 'some-fake-token-for-requests-and-api-usage', stubData);

			test.get('test1', function (doc) {
				assert.isObject(doc);
				done();
			});
		});


	});
});