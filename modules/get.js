module.exports = function (config) {
	'use strict';
	var http = config.http;

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

				doc = '';
			});
		});

		req.on('error', function(e){
			if(typeof error === 'function') {
				error(e);
			}
		});

		req.end();		
	};
};