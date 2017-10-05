const chars = ['a', 'b', 'c', 'd', 'e'];
const array = [];
for (let i = 0; i < 5; i++)
    array[i] = { f: () => chars[i] };

let f = () => 0;

/* 参见object.js
 * 字面量对象中左边键名是字符串，右边键值是对应的具体的值，而不是变量，若初始化字面量对象时，右边传递了一个变量，那么该字面量对象的这个
 * 键值就是当前该变量的值，初始化时键值就是固定下来了，此后键值与该变量无关了，所以不会在后面访问键值时，根据该变量当前值来改变这个键值*/
const o = { fn: f }; // 这样赋值就将o.fn固定为f当前指向的值，() => 0 函数

const oa = { fn: () => f() }; // 这样赋值，oa.fn调用时，会根据当前f指向的函数来调用，不同时间调用fn时，f指向的函数可能不同

for (let i = 0; i < 5; i++) {
    f = array[i].f;
    console.log(' o.fn ->', o.fn());  // o.fn返回值始终是0，不会随着f的变化而变化
    console.log('oa.fn ->', oa.fn()); // oa.fn返回值会随着f的变化发生变化
}