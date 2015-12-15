var http = require('http')

    , get = require('./modules/get')
    , save = require('./modules/save')
    , remove = require('./modules/remove')
    , query = require('./modules/query')
    , httpStub = require('./modules/httpStub')

    , utils = require('./utils')

    , setup = function (keyIn, tokenIn, hostIn, httpIn) {
        'use strict';

        var config = {
            version: 'v1'
        };

        if (typeof keyIn !== 'string'){
            throw new Error('key is required and must be a string');
        }

        if (typeof tokenIn !== 'string'){
            throw new Error('token is required and must be a string');
        }

        config.key = keyIn;
        config.token = tokenIn;
        config.http = typeof httpIn === 'undefined' ? http : httpIn;
        config.host = utils.getHost(hostIn, config.version);
        config.port = utils.getPort(hostIn);

        return {
            query: query(config)
            , remove: remove(config)
            , save: save(config)
            , get: get(config)
            , httpStub: function (stubs) {
                  config.http = httpStub(stubs);

                  this.query = query(config);
                  this.remove = remove(config);
                  this.save = save(config);
                  this.get = get(config);
              }
        };
    };

module.exports = setup;
