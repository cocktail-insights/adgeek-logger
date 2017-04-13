const test = require('tape');
const AdGeekLogger = require('../index');

test('Should not initialize without options', (t) => {
    t.throws(() => {
        AdGeekLogger()
    });
    t.end();
});

test('Should initialize with empty options object.', (t) => {
    t.doesNotThrow(() => {
        AdGeekLogger({})
    });
    t.end();
});

test('Should initialize with just a mongo_url', (t) => {
    t.doesNotThrow(() => {
        AdGeekLogger({
            mongo_url: 'some_url'
        })
    });
    t.end();
});

test('Should not initialize in production without a mongo_url', (t) => {
    t.throws(() => {
        AdGeekLogger({
            production: true
        })
    });
    t.end();
});