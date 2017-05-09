import test from 'tape';
import AdGeekLogger from '../lib/index';

test('Should not initialize without options', (t) => {
  t.throws(() => {
    AdGeekLogger();
  });
  t.end();
});

test('Should initialize with empty options object.', (t) => {
  t.doesNotThrow(() => {
    AdGeekLogger({});
  });
  t.end();
});

test('Should not initialize with just a mongo_url', (t) => {
  t.throws(() => {
    AdGeekLogger({
      mongo_url: 'some_url',
    });
  });
  t.end();
});
