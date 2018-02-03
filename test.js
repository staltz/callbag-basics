const test = require('tape');
const {
  forEach,
  interval,
  fromIter,
  take,
  map,
  filter,
  pipe
} = require('./index');

test('it works with observables', t => {
  t.plan(12);

  const expected = [1, 3, 5, 7, 9];

  pipe(
    interval(10),
    map(x => x + 1),
    filter(x => x % 2),
    take(5),
    forEach(x => {
      t.true(expected.length > 0);
      const e = expected.shift();
      t.equals(x, e);
    })
  );

  setTimeout(() =>{
    t.pass('nothing else happens');
    t.equals(expected.length, 0);
    t.end();
  }, 300);
});

test('it works with iterables', t => {
  t.plan(11);

  const expected = [10, 10.25, 10.5, 10.75, 11];

  function* range(from, to) {
    let i = from;
    while (i <= to) {
      yield i;
      i++;
    }
  }

  pipe(
    fromIter(range(40, 99)),
    take(5),
    map(x => x / 4),
    forEach(x => {
      t.true(expected.length > 0);
      const e = expected.shift();
      t.equals(x, e);
    })
  );

  t.equals(expected.length, 0);
});

