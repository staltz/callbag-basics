const test = require('tape');
const take = require('./index');

test('it takes from a pullable source', t => {
  t.plan(24);
  const upwardsExpected = [
    [0, 'function'],
    [1, 'undefined'],
    [1, 'undefined'],
    [1, 'undefined'],
    [2, 'undefined'],
  ];
  const downwardsExpectedType = [
    [0, 'function'],
    [1, 'number'],
    [1, 'number'],
    [1, 'number'],
    [2, 'undefined'],
  ];
  const downwardsExpected = [10, 20, 30];

  function makeSource() {
    let _sink;
    let sent = 0;
    const source = (type, data) => {
      const e = upwardsExpected.shift();
      t.equals(type, e[0], 'upwards type is expected: ' + e[0]);
      t.equals(typeof data, e[1], 'upwards data is expected: ' + e[1]);

      if (type === 0) {
        _sink = data;
        _sink(0, source);
        return;
      }
      if (type !== 1) return;

      if (sent === 0) {
        sent++;
        setTimeout(() => { _sink(1, 10); });
        return;
      } else if (sent === 1) {
        sent++;
        setTimeout(() => { _sink(1, 20); });
        return;
      } else if (sent === 2) {
        sent++;
        setTimeout(() => { _sink(1, 30); });
        return;
      } else if (sent === 3) {
        sent++;
        setTimeout(() => { _sink(1, 40); });
        return;
      } else if (sent === 4) {
        sent++;
        setTimeout(() => { _sink(1, 50); });
        return;
      } else if (sent === 5) {
        sent++;
        _sink(2);
        return;
      }
    };
    return source;
  }

  function makeSink() {
    let talkback;
    return (type, data) => {
      const et = downwardsExpectedType.shift();
      t.equals(type, et[0], 'downwards type is expected: ' + et[0]);
      t.equals(typeof data, et[1], 'downwards data type is expected: ' + et[1]);
      if (type === 0) {
        talkback = data;
        return talkback(1);
      }
      if (type === 1) {
        const e = downwardsExpected.shift();
        t.equals(data, e, 'downwards data is expected: ' + e);
        return talkback(1);
      }
    };
  }

  const source = makeSource();
  const taken = take(3)(source);
  const sink = makeSink();
  taken(0, sink);

  setTimeout(() => {
    t.pass('nothing else happens');
    t.end();
  }, 300);
});

test('it takes an async listenable source', t => {
  t.plan(18);
  const upwardsExpected = [[0, 'function'], [2, 'undefined']];
  const downwardsExpectedType = [
    [0, 'function'],
    [1, 'number'],
    [1, 'number'],
    [1, 'number'],
    [2, 'undefined'],
  ];
  const downwardsExpected = [10, 20, 30];

  function makeSource() {
    let sent = 0;
    let id;
    const source = (type, data) => {
      const e = upwardsExpected.shift();
      t.equals(type, e[0], 'upwards type is expected: ' + e[0]);
      t.equals(typeof data, e[1], 'upwards data is expected: ' + e[1]);
      if (type === 0) {
        const sink = data;
        id = setInterval(() => {
          sink(1, ++sent * 10);
        }, 100);
        sink(0, source);
      } else if (type === 2) {
        clearInterval(id);
      }
    };
    return source;
  }

  function sink(type, data) {
    const et = downwardsExpectedType.shift();
    t.equals(type, et[0], 'downwards type is expected: ' + et[0]);
    t.equals(typeof data, et[1], 'downwards data type is expected: ' + et[1]);
    if (type === 1) {
      const e = downwardsExpected.shift();
      t.equals(data, e, 'downwards data is expected: ' + e);
    }
  }

  const source = makeSource();
  const taken = take(3)(source);
  taken(0, sink);

  setTimeout(() => {
    t.pass('nothing else happens');
    t.end();
  }, 700);
});

test('it returns a source that disposes upon upwards END', t => {
  t.plan(16);
  const upwardsExpected = [[0, 'function'], [2, 'undefined']];
  const downwardsExpectedType = [
    [0, 'function'],
    [1, 'number'],
    [1, 'number'],
    [1, 'number'],
  ];
  const downwardsExpected = [10, 20, 30];

  function makeSource() {
    let sent = 0;
    let id;
    const source = (type, data) => {
      const e = upwardsExpected.shift();
      t.equals(type, e[0], 'upwards type is expected: ' + e[0]);
      t.equals(typeof data, e[1], 'upwards data is expected: ' + e[1]);
      if (type === 0) {
        const sink = data;
        id = setInterval(() => {
          sink(1, ++sent * 10);
        }, 100);
        sink(0, source);
      } else if (type === 2) {
        clearInterval(id);
      }
    };
    return source;
  }

  function makeSink(type, data) {
    let talkback;
    return (type, data) => {
      const et = downwardsExpectedType.shift();
      t.equals(type, et[0], 'downwards type is expected: ' + et[0]);
      t.equals(typeof data, et[1], 'downwards data type is expected: ' + et[1]);
      if (type === 0) {
        talkback = data;
      }
      if (type === 1) {
        const e = downwardsExpected.shift();
        t.equals(data, e, 'downwards data is expected: ' + e);
      }
      if (downwardsExpected.length === 0) {
        talkback(2);
      }
    };
  }

  const source = makeSource();
  const taken = take(9)(source);
  const sink = makeSink();
  taken(0, sink);

  setTimeout(() => {
    t.pass('nothing else happens');
    t.end();
  }, 700);
});

