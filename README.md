AdGeek Logger
=========

Logging Library for AdGeek

## Installation

  `npm install adgeek-logger`

## Usage

    const AdGeekLogger = require('adgeek-logger');

    const Log = AdGeekLogger({
      name: 'Logger',
      mongo_url: 'mongodb://localhost:27017/logs',
      collections: 'app-logs',
      production: true
    });

    Log.info('This is info with details', '<store_id>', detailsObject);
    Log.info('This is info with no details', '<store_id>');
    Log.info('This is info',);

    Log.error('This is info', '<store_id>', new Error('oops'));

  See code [Example](https://github.com/cocktail-insights/adgeek-logger/blob/master/example.js)
    

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.