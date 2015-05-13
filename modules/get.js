var http = require('http')
	, getDataFromStub = function (stubs, id) {
		'use strict';

		var collection;

		if(typeof id !== 'undefined') {
			collection = stubs.filter(function (item) {
				return item._id === id;
			})[0];
		} else {
			collection = stubs;
		}

		return collection;
	};

module.exports = function (config) {
	'use strict';

	return function (idIn, callbackIn, errorCallbackIn) {
		var id = idIn
			, callback = callbackIn
			, error = errorCallbackIn
			, options = {
				hostname: config.host,
				port: config.port,
				path: '/api/' + config.version + '/' + config.key,
				method: 'GET',
				headers: {
					'Authorization': config.token
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

		if(typeof config.stubs !== 'undefined'){
			callback(getDataFromStub(config.stubs, idIn));
		} else {
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
		
	};
};