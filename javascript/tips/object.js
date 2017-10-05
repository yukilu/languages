/* 因为创建o时，键名是字符串'a'，键值是变量a的值，即0，而不是变量a，键值只能是个具体的值，不可能是个变量
 * 所以全局变量a不管怎么变，o.a的值只是创建o的时候，a的值，而不是变量a */

let a = 0;
const o = { a: a };
a = 1;
console.log(o.a);  // 0