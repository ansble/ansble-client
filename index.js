var http = require('http')
	, version = 'v1'
	, key
	, token
	, get = function (idIn, callbackIn, errorCallbackIn) {
		'use strict';

		var id = idIn
			, callback = callbackIn
			, error = errorCallbackIn
			, options = {
				hostname: 'www.ansble.com',
				port: 80,
				path: '/api/' + version + '/' + key,
				method: 'GET',
				headers: {
					'Authorization': token
				}
			};

		if(typeof id === 'function'){
			//getting everything for the app
			callback = idIn;
			error = callbackIn;
		} else {
			options.path = options.path + '/' + idIn;
		}
		
		http.request(options, callback, error); //figure out scope here...
	}
	, save = function (itemIn, callbackIn, errorCallbackIn) {
		'use strict';

		var item = itemIn
			, callback = callbackIn
			, error = errorCallbackIn
			, options = {
				hostname: 'www.ansble.com',
				port: 80,
				path: '/api/' + version + '/' + key,
				method: 'POST',
				headers: {
					'Authorization': token
				}
			};

		if(typeof item._id !== 'undefined'){
			options.path = options.path + '/' + idIn;
			options.method = 'PUT';
		}
		
		http.request(options, callback, error); //figure out scope here...
	}

	, setup = function (keyIn, tokenIn) {
		'use strict';

		key = keyIN;
		token = tokenIn;

		if(typeof keyIN !== 'string'){
			throw 'key is required and must be a string';
		}

		if(typeof tokenIn !== 'string'){
			throw 'token is required and must be a string';
		}

		return {
			get: get
			, save: save
		};
	};

module.exports = setup;