module.exports = function (config) {
	'use strict';
	var http = config.http;

	return function (idIn, callbackIn, errorCallbackIn) {
		var options = {
				hostname: config.host,
				port: config.port,
				path: '/' + config.key + '/' + idIn,
				method: 'DELETE',
				headers: {
					'Authorization': config.token
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
	};
};
