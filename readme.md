# Callbag basics 👜

Basic callbag 팩토리 및 연산자 시작하기. [Callbag](https://github.com/callbag/callbag)은 스펙 이지만, `callbag-basics`은 사용할 수 있는 실제 라이브러리입니다.

**Highlights:**

- 반응 형 스트림 프로그래밍 지원
- iterable 프로그래밍 지원 (also!)
- 동일한 연산자가 위의 두 가지에 모두 적용됩니다.
- 작다! 무게는 [7kB](https://github.com/staltz/callbag-basics/tree/master/dist)에 불과하다.
- 빠르다! xstream 및 RxJS보다 [빠르다](https://github.com/staltz/callbag-basics/tree/master/perf)
- 확장성: 코어 라이브러리 없습니다.! 모두 유틸리티 함수입니다.

Observable과 (비동기) Iterable 사이의 하이브리드를 상상해보십시오. 그게 바로 콜백에 관한 전부입니다. 또한, [callbag spec](https://github.com/callbag/callbag)을 따르는 몇 가지 간단한 콜백(callbacks)으로 구현되기 때문에 코드가 가볍다. 그 결과, 작고 빠릅니다.

## 사용방법

`npm install callbag-basics`

연산자 및 팩토리 Import:

```js
const {forEach, fromIter, map, filter, pipe} = require('callbag-basics');
```

## 온라인으로 해보기

- [Observe Events](https://codesandbox.io/s/p5jwlp0x07)
- [Flatten Promises](https://codesandbox.io/s/1o8ykm56o4)
- [Flatten Events with Promises](https://codesandbox.io/s/m32m21v59x)

### 반응 프로그래밍 예제

<button>요소 에 대한 클릭 이벤트의 XY 좌표를 출력 합니다:

```js
const {forEach, fromEvent, map, filter, pipe} = require('callbag-basics');

pipe(
  fromEvent(document, 'click'),
  filter(ev => ev.target.tagName === 'BUTTON'),
  map(ev => ({x: ev.clientX, y: ev.clientY})),
  forEach(coords => console.log(coords))
);

// {x: 110, y: 581}
// {x: 295, y: 1128}
// ...
```

움직이는 시계의 초심이 가리키는 처음 5개의 홀수를 출력 합니다.
Pick the first 5 odd numbers from a clock that ticks every second, then start observing them:

```js
const {forEach, interval, map, filter, take, pipe} = require('callbag-basics');

pipe(
  interval(1000),
  map(x => x + 1),
  filter(x => x % 2),
  take(5),
  forEach(x => console.log(x))
);

// 1
// 3
// 5
// 7
// 9
```

### Iterable 프로그래밍 예제

특정 범위에서 숫자 5개 선택하고 4로 나눈 다음, 출력 합니다.
From a range of numbers, pick 5 of them and divide them by 4, then start pulling those one by one:

```js
const {forEach, fromIter, take, map, pipe} = require('callbag-basics');

function* range(from, to) {
  let i = from;
  while (i <= to) {
    yield i;
    i++;
  }
}

pipe(
  fromIter(range(40, 99)), // 40, 41, 42, 43, 44, 45, 46, ...
  take(5), // 40, 41, 42, 43, 44
  map(x => x / 4), // 10, 10.25, 10.5, 10.75, 11
  forEach(x => console.log(x))
);

// 10
// 10.25
// 10.5
// 10.75
// 11
```

## API

아래는 포함 된 함수 목록입니다.

### Source factories

- [fromObs](https://github.com/staltz/callbag-from-obs)
- [fromIter](https://github.com/staltz/callbag-from-iter)
- [fromEvent](https://github.com/staltz/callbag-from-event)
- [fromPromise](https://github.com/staltz/callbag-from-promise)
- [interval](https://github.com/staltz/callbag-interval)

### Sink factories

- [forEach](https://github.com/staltz/callbag-for-each)

### Transformation operators

- [map](https://github.com/staltz/callbag-map)
- [scan](https://github.com/staltz/callbag-scan)
- [flatten](https://github.com/staltz/callbag-flatten)

### Filtering operators

- [take](https://github.com/staltz/callbag-take)
- [skip](https://github.com/staltz/callbag-skip)
- [filter](https://github.com/staltz/callbag-filter)

### Combination operators

- [merge](https://github.com/staltz/callbag-merge)
- [concat](https://github.com/staltz/callbag-concat)
- [combine](https://github.com/staltz/callbag-combine)

### Utilities

- [share](https://github.com/staltz/callbag-share)
- [pipe](https://github.com/staltz/callbag-pipe)

### More

- [*Check the Wiki*](https://github.com/callbag/callbag/wiki)

## 설명

- **source**: 데이터를 전달하는 callbag
- **sink**: 데이터를 받는 callbag
- **puller sink**: 데이터를 적극적으로 요청하는 싱크
- **pullable source**: 요청 수신시에만 데이터를 전달하는 소스
- **listener sink**: 소스로부터 수동적으로 데이터를 수신하는 싱크
- **listenable source**: 요청에 대한 대기 없이, 싱크에 데이터를 보내는 소스
- **operator**: 어떤 작업을 적용하는 다른 callbag 기반의 callbaga

## 기여

**Callbag의 철학: 스스로 만드세요.** :)
pr을 보낼 수는 있지만, 그러나 저장소 소유자의 수락을 기대하지 마세요. 프로젝트를 포크하고 원하는대로 사용자 정의하고 포크를 npm에 게시하십시오. 콜백 스펙을 따르는 한 모든 것이 상호 운용 될 것입니다! :)

