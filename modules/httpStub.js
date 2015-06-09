
var sandbox = require('sandbox');

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

		, removeItem = function (path) {
			var id = path.split('v1')[1].split('/').splice(1)[1]
				, success = false;

			stubsIn.forEach(function (item, index) {
				if(item._id === id){
					stubsIn.splice(index, 1);
					success = true;
				}
			});

			return JSON.stringify({success: success});
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
				var data
					, rtn
					, s
					, execString;

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
					resObj.emit('end');
				} else if(options.method.toLowerCase() === 'delete') {
					resObj.emit('data', removeItem(options.path));
					resObj.emit('end');
				} else if(options.method.toLowerCase() === 'report') {
					data = JSON.parse(dataIn);

					s = new sandbox();
					execString = 'data';

					data.forEach(function (item) {
						if(item.type === 'filter' || item.type === 'map' || item.type === 'reduce'){
							execString += '.' + item.type + '(' + item.body + ')';
						}
					});

					s.run('data = ' + JSON.stringify(stubsIn) + '; result = JSON.stringify(' + execString + ');', function (output) {
						resObj.emit('data', output.result);
						resObj.emit('end');
					});
					
				} else {
					resObj.emit('data', appendOptions(getStubData(options.path), options));
					resObj.emit('end');
				}

				return true;
			};

			callback(resObj);

			return reqObj;
		}
	};
};