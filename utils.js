var getPort = function (hostIn) {
        'use strict';
        var portCheck = typeof hostIn === 'string' ? hostIn.split(':') : [];

        if (portCheck.length > 1){
            return parseInt(portCheck[1], 10);
        } else {
            return 80;
        }
    }

    , getHost = function (hostIn, versionIn) {
        'use strict';

        var version = versionIn || 'v1';

        if(hostIn && typeof hostIn.split !== 'undefined' && hostIn.split(':')) {
            return hostIn.split(':')[0];
        } else {
            return version + '.ansble.com';
        }
    };

module.exports = {
    getPort: getPort
    , getHost: getHost
};
