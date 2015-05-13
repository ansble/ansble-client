var stubs = {}

	, get = require('./modules/get')
	, save = require('./modules/save')
	, remove = require('./modules/remove')
	, query = require('./modules/query')

	, utils = require('./utils')

	, setup = function (keyIn, tokenIn, hostIn, stubsIn) {
		'use strict';
		var config = {
				key: keyIn
				, token: tokenIn
				, host: hostIn
				, version: 'v1'
			};

		if(Array.isArray(stubsIn) || Array.isArray(hostIn)){
			stubs = stubsIn || hostIn;

			config.stubs = stubs;
		}

		if(typeof keyIn !== 'string'){
			throw new Error('key is required and must be a string');
		}

		if(typeof tokenIn !== 'string'){
			throw new Error('token is required and must be a string');
		}

		config.host = utils.getHost(config.host);
		config.port = utils.getPort(config.host);

		return {
			get: get(config)
			, save: save(config)
			, remove: remove(config)
			, query: query(config)
		};
	};

module.exports = setup;