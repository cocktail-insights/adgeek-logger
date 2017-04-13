const AdGeekLogger = require('./index');

const DevelopmentLog = AdGeekLogger({
    name: 'DevLogger'
});

DevelopmentLog.info('This is info with details', '<store_id>', {foo: 'bar'});
DevelopmentLog.info('This is info with no details', '<store_id>');
DevelopmentLog.info('This is info');

DevelopmentLog.error('Oops. Something went wrong', '<store_id>', new Error('oops'));
DevelopmentLog.error('Oops. Something went wrong', '<store_id>');
DevelopmentLog.error('Oops. Something went wrong');



const ProductionLog = AdGeekLogger({
    name: 'ProdLogger',
    mongo_url: 'mongodb://localhost:27017/somedatabase',
    collections: 'logs',
    production: true
});

ProductionLog.info('This is info with details', '<store_id>', {foo: 'bar'});
ProductionLog.info('This is info with no details', '<store_id>');
ProductionLog.info('This is info');

ProductionLog.error('Oops. Something went wrong', '<store_id>', new Error('oops'));
ProductionLog.error('Oops. Something went wrong', '<store_id>');
ProductionLog.error('Oops. Something went wrong');