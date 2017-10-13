/* 函数指针变量可以声明成函数形式，也可以声明成Function类
 * JavaScript中的函数也是对象，只是是一类特殊的对象
 * 1. 作为函数，可以声明成函数形式 (arg: number) => number
 * 2. 作为对象，可以声明成Function类
 */

function fn(arg: number): number { return arg }

// 1. 声明为函数形式的函数指针
let f: (arg: number) => number = fn;

// 2. 声明为Function类的对象
let fa: Function = fn;

console.log(fa(0));  // 可以正常调用，没什么问题