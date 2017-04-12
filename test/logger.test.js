const test = require('tape');
const AdGeekLogger = require('../index');

test('Should not initialize without mongo_url', (t) => {
    t.throws(() => {
        AdGeekLogger({})
    });
    t.end();
});

test('Should initialize with just a mongo_url', (t) => {
    t.doesNotThrow(() => {
        AdGeekLogger({ mongo_url: 'some_url'})
    });
    t.end();
});

test('Should initialize with just a mongo_url', (t) => {
    t.doesNotThrow(() => {
        AdGeekLogger({ mongo_url: 'some_url'})
    });
    t.end();
});