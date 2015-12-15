var assert = require('chai').assert
	, utils = require('./utils');

describe('Utils Tests', function () {
	'use strict';

	describe('getPort tests', function () {
		it('should be a function', function () {
			assert.isFunction(utils.getPort);
		});

		it('should return 80 if no port specified on the host passed in', function () {
			assert.strictEqual(utils.getPort('www.google.com'), 80);
		});

		it('should return 3000 if port specified on the host passed in is 3000', function () {
			assert.strictEqual(utils.getPort('www.google.com:3000'), 3000);
		});
	});

	describe('getHost tests', function () {
		it('should be a function', function () {
			assert.isFunction(utils.getHost);
		});

		it('should return the ansble.com if no host is passed in', function () {
			assert.strictEqual(utils.getHost(), 'v1.ansble.com');
		});

		it('should return the ansble.com if something other then a string is passed in', function () {
			assert.strictEqual(utils.getHost(['this', 'is', 'an', 'array']), 'v1.ansble.com');
		});

		it('should return the host if a host is passed in', function () {
			assert.strictEqual(utils.getHost('www.google.com'), 'www.google.com');
		});

		it('should return the host minus port if port and host passed in', function () {
			assert.strictEqual(utils.getHost('www.google.com:3000'), 'www.google.com');
		});
	});
});
