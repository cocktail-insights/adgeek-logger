'use strict';

import bunyan from 'bunyan';
import mongoStream from 'stream-to-mongo';

const LEVELS = {
  50: 'error',
  30: 'info',
};

function getMongoStream(url, collection, level) {
  return {
    type: 'raw',
    level: level || 'info',
    stream: mongoStream({
      db: url,
      collection,
    }),
  };
}

function AdGeekLogger(opts) {
  if (!opts.production && opts.mongo_url) {
    throw new Error('mongo_url is required in production mode.');
  }

  if (opts.production && (!opts.mongo_url || !opts.customStream)) {
    console.warn('**********\n\nConsider using something other than just console in production\n\n**********\n\n');
  }

  // Create options object passing in defaults if not provided.
  const options = {
    name: opts.name || 'adgeek-logger',
    streams: [],
  };

  if (opts.customStream) {
    options.streams.push(opts.customStream);
  }

  if (opts.logToConsole) {
    options.streams.push({
      level: opts.level || 'info',
      stream: process.stdout,
    });
  }

  if (opts.production && opts.mongo_url) {
    options.streams.push(getMongoStream(opts.mongo_url, opts.collection, 'info'));
  }

  const log = bunyan.createLogger(options);

  return {

    /**
     * Log at the info level
     *
     * @param {String} message
     * @param {String} storeId
     * @param {Object} details
     * @returns
     */
    info(message, storeId, details) {
      return log.info({
        details,
        type: storeId || 'store',
        level_name: LEVELS['30'],
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
    error(message, storeId, error) {
      if (error instanceof Error) {
        return log.error({
          details: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
          type: storeId || 'store',
          level_name: LEVELS['50'],
        }, message);
      }
      return log.error({
        details: error,
        type: storeId || 'store',
        level_name: LEVELS['50'],
      }, message);
    },
  };
}

export default AdGeekLogger;
