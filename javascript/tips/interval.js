/*     javascript是单线程的，基于事件回调的，js中存在一个任务队列，回调函数会被加入任务队列，当主线程空闲时，会去轮询任务队列，
 * 调用其中的回调函数，而setInteval是每隔一定事件将回调函数加入任务队列中，但是有时候主线程执行过久，当前一个加入的回调函数
 * 未被调用时，setInterval并不会继续向任务队列中加入回调函数，而是暂停，等前一个回调函数被调用了，才会继续向任务队列中加入
 * 回调函数
 *     这样做可能是为了性能考虑，因为若主线程执行过久时，还每隔一段时间不停向任务队列中加入回调函数，会造成任务队列中有
 * 大量回调函数，而且这些回调函数在主线程空闲时，会依次执行，并没有时间间隔，这也不符合setInterval每隔特定时间执行的本意
 */

function fib(n) {
    if (n < 2)
        return n;
    return fib(n - 1) + fib(n - 2)
}

function now() {
    return Date.now() / 1000;
}

setInterval(() => console.log(now()), 1000);

console.log(`${now()} fib starts...`);
fib(42);  // 执行大约10s
console.log(`${now()} fib ends.`);

/* 可以看到上述代码，定时器setInterval在fib结束时，几乎同时会有一个回调函数运行，然后再每隔1s运行一次
 * 这就说明setInterval会判断前一个回调函数是否执行了，没执行说明主线程并未空闲，此时setInterval也不会继续向任务队列继续加入更多
 * 回调函数，而是自身也暂停了，等主线程空闲时，已经加入任务队列的回调函数执行之后，再每秒向任务队列加入回调函数
 */

// 同时，下面以setTimeout作对比
for (let t of [1, 2, 3])
    setTimeout(() => console.log(now()), t * 1000);

console.log(`${now()} fib starts...`);
fib(42);  // 执行大约10s
console.log(`${now()} fib ends.`);

/* 可以看到独立的3个setTimeout加入的回调函数，会在fib结束时，依次几乎同时执行，其间并未相隔1s
 * 因为主线程计算fib(42)要约10s，这期间并不空闲，而定时器会在1s，2s，3s时，将三个回调函数加入任务队列，当主线程10s时，空闲，
 * 去轮询任务队列，此时有3个回调函数，依次几乎同时执行，这符合JavaScript的执行方式
 */