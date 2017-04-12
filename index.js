const bunyanMongoDbLogger = require('bunyan-mongodb-logger');
const LEVELS = {
    50: 'error',
    30: 'info'
};

module.exports = (opts) => {

    if (opts.mongo_url) {
        // Create options object passing in defaults if not provided.
        const options = Object.assign({}, {
            name: 'adgeek-logger',
            production: process.env.NODE_ENV === 'production',
            collection: 'logs'
        }, opts);

        const log = bunyanMongoDbLogger({
            name: options.name,
            stream: options.production ? 'mongodb' : 'stdout',
            url: options.mongo_url,
            collections: options.collection
        });

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
    } else {
        throw new Error('mongo_url is required');
    }
}