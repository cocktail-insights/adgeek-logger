const bunyanMongoDbLogger = require('bunyan-mongodb-logger');
const LEVELS = {
    50: 'error',
    30: 'info'
};

module.exports = (opts) => {

    if (opts.production && !opts.mongo_url) {
        throw new Error('mongo_url is required in production');
    } else {
        opts.url = opts.mongo_url;
        delete opts.mongo_url;
        // Create options object passing in defaults if not provided.
        const options = Object.assign({}, {
            name: 'adgeek-logger',
            stream: (opts.production && opts.url) ? 'mongodb' : 'stdout',
            collections: 'logs'
        }, opts);

        const log = bunyanMongoDbLogger(options);

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
                    level_name: LEVELS['30']
                }, message)
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
                            stack: error.stack
                        },
                        type: storeId || 'store',
                        level_name: LEVELS['50']
                    }, message);
                } else {
                    return log.error({
                        error,
                        type: storeId || 'store',
                        level_name: LEVELS['50']
                    }, message);
                }
            }
        };
    }
}