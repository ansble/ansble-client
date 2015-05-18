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

	it('should save an object with no ID returning it with an ID', function (done) {
		save(configStub)({name: 'daniel', site: 'ansble.com'}, function (doc) {
			assert.isObject(doc);
			assert.isDefined(doc._id);
			assert.strictEqual(doc.name, 'daniel');
			done();
		});
	});

	it('should save an object with no ID using POST', function (done) {
		save(configStub)({name: 'daniel', site: 'ansble.com'}, function (doc) {
			assert.isObject(doc);
			assert.isDefined(doc.httpOptions.method);
			assert.strictEqual(doc.httpOptions.method, 'POST');
			done();
		});
	});

	it('should save an object with an _meta using PUT to a path that includes the ID', function (done) {
		save(configStub)({_id: 'test', name: 'daniel', site: 'ansble.com', _meta: {created: new Date()}}, function (doc) {
			assert.isObject(doc);
			assert.isDefined(doc.httpOptions.method);
			assert.strictEqual(doc.httpOptions.method, 'PUT');
			assert.strictEqual(doc.httpOptions.path, '/api/v1/keyIn/test');
			done();
		});
	});

	it('should save an object when an ID is passed in', function (done) {
		save(configStub)({_id: 'person1', name: 'daniel', site: 'ansble.com'}, function (doc) {
			assert.isObject(doc);
			assert.strictEqual(doc._id, 'person1');
			assert.strictEqual(doc.name, 'daniel');
			done();
		});
	});	
});