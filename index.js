var http = requrie('http')
	, key
	, token
	, get = function (id, callback, errorCallback) {

	}
	, save = function (item, callback, errorCallback) {

	}

	, setup = function (keyIn, tokenIn) {
		key = keyIN;
		token = tokenIn;

		return {
			get: get
			, save: save
		};
	};

module.exports = setup;