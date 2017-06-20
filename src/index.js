'use strict';

import bunyan from 'bunyan';

const LEVELS = {
  50: 'error',
  30: 'info',
};

const defaultOptions = {
  production: false,
  name: 'adgeek-logger',
  customStream: null,
  logToConsole: true,
};

function AdGeekLogger(opts) {
  const options = Object.assign({}, defaultOptions, opts);

  if (options.production && !options.customStream) {
    console.warn('**********\n\nConsider using something other than just console in production\n\n**********\n\n');
  }

  // Create options object passing in defaults if not provided.
  const bunyanOptions = {
    name: options.name,
    streams: [],
  };

  if (options.customStream) {
    bunyanOptions.streams.push(options.customStream);
  }

  if (options.logToConsole) {
    bunyanOptions.streams.push({
      level: opts.level || 'info',
      stream: process.stdout,
    });
  }

  const log = bunyan.createLogger(bunyanOptions);

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
