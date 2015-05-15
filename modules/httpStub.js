
module.exports = function (stubsIn) {
	'use strict';
	var events = require('events')

		, getStubData = function (path) {
			var id = path.split('v1')[1].split('/').splice(1);

			
			if(id.length === 1){
				return JSON.stringify(stubsIn);
			} else {
				return JSON.stringify(stubsIn.filter(function (item) {
					return item._id === id[1];
				})[0]);
			}
		};


	return {
		request: function (options, callback) {
			var resObj = new events.EventEmitter()
				, reqObj = new events.EventEmitter();

			resObj.setEncoding = function () {
				return true;
			};

			resObj.statusCode = 200;

			reqObj.end = function () {			
				resObj.emit('data', getStubData(options.path));
				resObj.emit('end');
				return true;
			};

			callback(resObj);

			return reqObj;
		}
	};
};