/* for...of...循环中，for (let v of it) {...}，循环中真正使用的是it[Symbol.iterator]()返回的对象，对其调用next函数
 * for (let v of it) {...}，实际过程如下
 * const iterator = it[Symbol.iterator]()
 * let result = iterator.next()
 * for(; !result.done; result = iterator.next()) {...} 或
 * while(!result.done) {... result = iterator.next()}
 * 
 * ...操作符同理，所以使用for...of...及...操作符时，能返回可迭代对象的对象是可以的，但有时候直接作用于可迭代对象时
 * 还要给可迭代对象本身定义一个[Symbol.iterator]函数来返回自身，比如生成器函数返回的可迭代对象，
 * 
 * 总结：
 * 1. 当for...of...或...操作符是作用于定义了[Symbol.iterator]函数(返回值为迭代器)的对象
 * 2. 当for...of...或...操作符作用于迭代器时，并没有真的直接作用于迭代器，而还是通过调用迭代器的[Symbol.iterator]函数来获得其迭代器
 * 自身来间接作用于迭代器的，所以这就是为什么有些迭代器还要再定义一个返回自身的[Symbol.iterator]函数
 */
let o = {
    n: 0,
    next() {
        const done = this.n < 10 ? false : true;
        return { value: n++, done };
    }
};

for (let v of o)
    console.log(v);  // 报错，因为没定义o[Symbol.iterator]函数

o[Symbol.iterator] = function () {
    return this;
};

for (let v of o)
    console.log(v);  // 正确返回

// 所以生成器函数返回的迭代器对象之所以能直接使用for...of...循环，正是其定义了[Symbol.iterator]函数
function* g() {
    yield 0;
    yield 1;
    yield 2;
}

let it = g();  // it本身是可以it.next()迭代的，而能使用for...of...，说明it[Symbol.iterator]函数返回了自身，分析如下
for(let v of it)
    console.log(v);  // 正确执行

let itt = it[Symbol.iterator]();  // 实际上返回的是自身，但正是定义了[Symbol.iterator]函数，才能被for...of...使用
itt === it;  // true