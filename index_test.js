var assert = require('chai').assert
	, client = require('./index')
	, httpStub = require('./modules/httpStub')
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
			var test = client('some-fake-key', 'some-fake-token-for-requests-and-api-usage', null, httpStub(stubData));

			test.get('test1', function (doc) {
				assert.isObject(doc);
				assert.strictEqual(doc._id, 'test1');
				done();
			});
		});
	});

	describe('exposed stubbing for use in client tests', function () {
		it('should have an httpStub function available', function () {
			var testClient = client('some-fake-key', 'some-fake-token-for-requests-and-api-usage');

			assert.isFunction(testClient.httpStub);
		});

		it('should replace a real http with the stubbed one when executed', function (done) {
			var stubData = [
					{
						_id: 'test1'
						, title: 'This is a title'
						, tags: [
							'these'
							, 'are'
							, 'tags'
							, 'security'
						]
						, content: 'This is some content'
					}
					, {
						_id: 'test2'
						, title: 'This is a title'
						, tags: [
							'these'
							, 'are'
							, 'tags'
							, 'security'
						]
						, content: 'This is some content'
					}
				]
				, testClient = client('some-fake-key', 'some-fake-token-for-requests-and-api-usage');

			testClient.httpStub(stubData);

			testClient.get('test1', function (doc) {
				assert.isObject(doc);
				assert.strictEqual(doc._id, 'test1');
				done();
			});
		});
	});
});
