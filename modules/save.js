var http = require('http');

module.exports = function (config) {
	'use strict';

	return function (itemIn, callbackIn, errorCallbackIn) {
		var item = itemIn
			, callback = callbackIn
			, error = errorCallbackIn
			, options = {
				hostname: config.host,
				port: config.port,
				path: '/api/' + config.version + '/' + config.key,
				method: 'POST',
				headers: {
					'Authorization': config.token
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
	};
};