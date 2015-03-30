var http = require('http')
	, version = 'v1'
	, host
	, key
	, token
	, port
	, get = function (idIn, callbackIn, errorCallbackIn) {
		'use strict';

		var id = idIn
			, callback = callbackIn
			, error = errorCallbackIn
			, options = {
				hostname: host,
				port: port,
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
				hostname: host,
				port: port,
				path: '/api/' + version + '/' + key,
				method: 'POST',
				headers: {
					'Authorization': token
				}
			}

			, req;

		if(typeof item._meta !== 'undefined'){
			options.path = options.path + '/' + item._id;
			options.method = 'PUT';
		}
		
		req = http.request(options, function (res) {
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

		req.end(JSON.stringify(item));
	}

	, remove = function (idIn, callbackIn, errorCallbackIn) {
		'use strict';
		var options = {
				hostname: host,
				port: port,
				path: '/api/' + version + '/' + key + '/' + idIn,
				method: 'DELETE',
				headers: {
					'Authorization': token
				}
			}
			, req;

		req = http.request(options, function (res) {
			var doc = '';

			res.setEncoding('utf8');

			res.on('data', function(data){
				doc += data;
			});

			res.on('end', function() {
				if(res.statusCode === 200){
					callbackIn(JSON.parse(doc));
				} else if(typeof errorCallbackIn === 'function'){
					errorCallbackIn(doc);
				}
			});
		});

		req.end();
	}

	, query = function (objectIn, callbackIn, errorCallbackIn) {
		'use strict';
		//this is where the map and reduce functions get used
		//	send with a cool verb like Report

		var options = {
				hostname: host,
				port: port,
				path: '/api/' + version + '/' + key,
				method: 'REPORT',
				headers: {
					'Authorization': token
					, 'content-type': 'text/plain'
				}
			}
			, req;

		if(typeof objectIn === 'object' && Array.isArray(objectIn)){
			objectIn.forEach(function (item) {
				item.body = item.body.toString();
			});

			req = http.request(options, function (res) {
				var doc = '';

				res.setEncoding('utf8');

				res.on('data', function(data){
					doc += data;
				});

				res.on('end', function() {
					if(res.statusCode === 200){
						callbackIn(doc);
						// callbackIn(JSON.parse(doc));
					} else if(typeof errorCallbackIn === 'function'){
						errorCallbackIn(doc);
					}
				});
			});

			req.end(JSON.stringify(objectIn));
		} else {
			errorCallbackIn();
		}

	}

	, setup = function (keyIn, tokenIn, hostIn) {
		'use strict';
		var portCheck;

		key = keyIn;
		token = tokenIn;

		if(typeof keyIn !== 'string'){
			throw 'key is required and must be a string';
		}

		if(typeof tokenIn !== 'string'){
			throw 'token is required and must be a string';
		}

		host = hostIn || 'www.ansble.com';
		portCheck = host.split(':');

		if(portCheck.length > 1){
			port = parseInt(portCheck[1], 10);
			host = portCheck[0];
		} else {
			port = 80;
		}

		return {
			get: get
			, save: save
			, remove: remove
			, query: query
		};
	};

module.exports = setup;