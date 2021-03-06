module.exports = function (config) {
	'use strict';
	var http = config.http;

	return function (objectIn, callbackIn, errorCallbackIn) {
		//this is where the map and reduce functions get used
		//	send with a cool verb like Report

		var options = {
				hostname: config.host,
				port: config.port,
				path: '/' + config.key,
				method: 'REPORT',
				headers: {
					'Authorization': config.token
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
						callbackIn(JSON.parse(doc.replace(/(^')|('$)/g, '')));
					} else if(typeof errorCallbackIn === 'function'){
						errorCallbackIn(doc);
					}
				});
			});

			req.end(JSON.stringify(objectIn));
		} else {
			errorCallbackIn();
		}

	};
};
