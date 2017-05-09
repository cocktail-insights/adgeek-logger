'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _streamToMongo = require('stream-to-mongo');

var _streamToMongo2 = _interopRequireDefault(_streamToMongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LEVELS = {
  50: 'error',
  30: 'info'
};

function getMongoStream(url, collection, level) {
  return {
    type: 'raw',
    level: level || 'info',
    stream: (0, _streamToMongo2.default)({
      db: url,
      collection: collection
    })
  };
}

function AdGeekLogger(opts) {
  if (!opts.production && opts.mongo_url) {
    throw new Error('mongo_url is required in production mode.');
  }

  if (opts.production && (!opts.mongo_url || !opts.stream)) {
    console.warn('**********\n\nConsider using something other than just console in production\n\n**********\n\n');
  }

  // Create options object passing in defaults if not provided.
  var options = {
    name: opts.name || 'adgeek-logger',
    streams: []
  };

  if (opts.customStream) {
    options.streams.push(opts.customStream);
  }

  if (opts.logToConsole) {
    options.streams.push({
      level: opts.level || 'info',
      stream: process.stdout
    });
  }

  if (opts.production && opts.mongo_url) {
    options.streams.push(getMongoStream(opts.mongo_url, opts.collection, 'info'));
  }

  var log = _bunyan2.default.createLogger(options);

  return {

    /**
     * Log at the info level
     *
     * @param {String} message
     * @param {String} storeId
     * @param {Object} details
     * @returns
     */
    info: function info(message, storeId, details) {
      return log.info({
        details: details,
        type: storeId || 'store',
        level_name: LEVELS['30']
      }, message);
    },

    /**
     * Log at the error level
     *
     * @param {String} message
     * @param {String} storeId
     * @param {Error} error
     * @returns
     */
    error: function error(message, storeId, _error) {
      if (_error instanceof Error) {
        return log.error({
          details: {
            name: _error.name,
            message: _error.message,
            stack: _error.stack
          },
          type: storeId || 'store',
          level_name: LEVELS['50']
        }, message);
      }
      return log.error({
        details: _error,
        type: storeId || 'store',
        level_name: LEVELS['50']
      }, message);
    }
  };
}

exports.default = AdGeekLogger;