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
			}
			, req;

		if(typeof id === 'function'){
			//getting everything for the app
			callback = idIn;
			error = callbackIn;
		} else {
			options.path = options.path + '/' + idIn;
		}
		
		req = http.request(options, function(res){
			var doc = '';

			res.setEncoding('utf8');

			res.on('data', function(data){
				doc += data;
			});

			res.on('end', function() {
				if(res.statusCode === 200){
					callback(JSON.parse(doc));
				} else if(typeof error === 'function'){
					error(doc);
				}
			});


		});

		req.on('error', function(e){
			if(typeof error === 'function') {
				error(e);
			}
		});

		req.end();
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

		if(typeof item._meta !== 'undefined'){
			options.path = options.path + '/' + item._id;
			options.method = 'PUT';
		}
		
		http.request(options, callback, error); //figure out scope here...
	}

	, destroy = function (idIn, callbackIn, errorCallbackIn) {
		'use strict';
		var options = {
				hostname: 'www.ansble.com',
				port: 80,
				path: '/api/' + version + '/' + key + '/' + idIn,
				method: 'DELETE',
				headers: {
					'Authorization': token
				}
			};

		http.request(options, callbackIn, errorCallbackIn); 
	}

	, query = function (objectIn) {
		'use strict';
		//this is where the map and reduce functions get used
		//	send with a cool verb like Report

	}

	, setup = function (keyIn, tokenIn) {
		'use strict';

		key = keyIn;
		token = tokenIn;

		if(typeof keyIn !== 'string'){
			throw 'key is required and must be a string';
		}

		if(typeof tokenIn !== 'string'){
			throw 'token is required and must be a string';
		}

		return {
			get: get
			, save: save
			, destroy: destroy
		};
	};

module.exports = setup;