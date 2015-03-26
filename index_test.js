var assert = require('chai').assert
	, client = require('./index');

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
	});
});