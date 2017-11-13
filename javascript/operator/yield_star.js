// yield委托 yield *，就是将控制权委托给另一个迭代器

function *f() {
    yield 0;
    yield 1;
    yield 2;
    return 3;
}

function *g() {
    yield 'a';
    yield 'b';
    let vf = yield* f();
    //console.log(`vf=${vf}`);  // 打印 vf=3，此处yield*表达式的值就是f()的返回值3
    yield 'c';
}

// 在g中到yield*之后，就将控制权委托给了f，在f中进行迭代，直到f结束，再回到g中继续迭代
for(let v of g())
    console.log(v);  // a b 0 1 2 c

/* 由于是将控制权委托给了另一个迭代器，所以在原函数中，yield*并不是一次yield，而是将权限给了被委托的迭代器，
 * 可以认为yield* f()之后，进入f中迭代，yield* 就消失了，后面的事与yield*没关系了，当前如何操作就取决了被委托的迭代器了
 * 若被委托的迭代器内部并没有yield，而是直接返回了，则这次yield*委托，不会产生中断，而是继续往下执行，示例入下
 */

function *f1() {
    return 0;
}

function *g1() {
    yield 'a';
    yield* f1();
    yield 'b';
}

let it1 = g1()
console.log(it1.next());  // 第一次next，到达第一个yield 'a'，返回'a'
console.log(it1.next());  // 第二次next，yield* f1()并未中断，而是直接到达了yield 'b'，因为f1中并没有yield，所以不会中断

// 委托可以认为等同于以下代码，只是效果上等同，实际上还是应该看成是控制权的转移
function *ge() {
    yield 'a';
    yield 'b';
    // yield* f();
    for (let v of f())
        yield v;
    yield 'c';
}