
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
		}

		, appendOptions = function (dataIn, optionsIn) {
			dataIn = JSON.parse(dataIn);
			dataIn.httpOptions = optionsIn;

			return JSON.stringify(dataIn);
		};


	return {
		request: function (options, callback) {
			var resObj = new events.EventEmitter()
				, reqObj = new events.EventEmitter();

			resObj.setEncoding = function () {
				return true;
			};

			resObj.statusCode = 200;

			reqObj.end = function (dataIn) {
				var data;

				if(options.method.toLowerCase() === 'put' || options.method.toLowerCase() === 'post'){
					data = JSON.parse(dataIn);

					if(typeof data._id === 'undefined'){
						data._id = 'some-random-string';
					}
					
					if(!options.path.match(new RegExp('/' + data._id))){
						options.path += '/' + data._id;
					}
					

					stubsIn.push(data);

					resObj.emit('data', appendOptions(getStubData(options.path), options));
				} else if(options.method.toLowerCase() === 'delete') {
					data = getStubData(options.path);

					resObj.emit('data', JSON.stringify({success: (typeof data !== 'undefined')}));
				} else {
					resObj.emit('data', appendOptions(getStubData(options.path), options));
				}

				resObj.emit('end');
				return true;
			};

			callback(resObj);

			return reqObj;
		}
	};
};