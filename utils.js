var getPort = function (hostIn) {
		'use strict';
		var portCheck = hostIn.split(':');

		if(portCheck.length > 1){
			return parseInt(portCheck[1], 10);
		} else {
			return 80;
		}
	}

	, getHost = function (hostIn) {
		'use strict';

		if(hostIn && typeof hostIn.split !== 'undefined' && hostIn.split(':')) {
			return hostIn.split(':')[0];
		} else if(hostIn && typeof hostIn === 'string'){
			return hostIn;
		} else {
			return 'www.ansble.com';
		}
	};

module.exports = {
	getPort: getPort
	, getHost: getHost
};