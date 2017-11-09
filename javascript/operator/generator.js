// 由以下代码可以发现，迭代器遇到return时候才认为迭代结束，会将done置为true，
// 遇到yield时候，由于任意函数必有一个return值(没写return的函数，会在最后默认return undefined)，所以done必然为false，还需要迭代

function* g() {
    yield 1;
    yield 2;
    return 3;
}

let i = g();
i.next();  // { value: 1, done: false }
i.next();  // { value: 2, done: false}
// 迭代直到return才结束，return的值是迭代器返回的最后一个值，没写return会默认返回一个undefined
i.next();  // { value: 3, done: true }

// 未写return的生成器函数
function* gen() {
    yield 1;
    yield 2;  // 未结束，还有函数默认返回undefined
}

let it = gen();
it.next();  // { value: 1, done: false }
it.next();  // { value: 2, done: false }
// 注意到下面才认为迭代结束，虽然在上一个next时候，好像已经到代码结束位置了，
// 但是实际上上面函数还会默认返回一个undefined，这也是为什么此次的value是undefined，因为不写return，默认返回的是undefined
// 所以yield 2并未结束，gen函数等同于以下函数gene
it.next();  // { value: undefined, done: true }

// gen函数的完整形式，gen只是下述函数省略return的简写形式
function* gene() {
    yield 1;
    yield 2;
    return undefined;  // 结束，显式返回undefined，所以最后一个next返回的value值为undefined
}

let iter = gene();
iter.next();  // { value: 1, done: false }
iter.next();  // { value: 2, done: false }
iter.next();  // { value: undefined, done: true }