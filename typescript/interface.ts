/* interface的声明类型、
 * 参考链接： https://www.tslang.cn/docs/handbook/interfaces.html
 * 1. 字面量对象，非new出来的对象，(new的用class直接声明较好)
 * 2. 函数
 * 3. 可索引类型
 * 4. 混合类型
 * 
 * interface分两种:
 * 1. 匿名，表示对象自身特殊结构，例如表示函数和可索引类型(js中函数也是对象)
 * interface f { (arg: number): string }
 * interface i { [index: number]: string }
 * 
 * 2. 写明属性值，表示对象下的属性及方法，例如表示字面量对象类型
 * interface o { a: number， method(arg: number): string }
 */

 // 字面量对象
 interface Test {
     a: number;
     b: string;
 }

 let t: Test = { a: 0, b: 'b' };
 let ta: { a: number; b: string } = { a: 0, b: 'b' };  // 这样直接声明也可以

 // 函数
 interface Add {
     (baseValue: number, increment: number): number;
 }

 let add: Add = function (a: number, b: number): number { return a + b; };

// 可索引类型，相当于arr[0]或arr['prop']，index就是中括号中间数据类型，通过中括号来访问对象属性
interface StringArray {
    [index: number]: string  // arr[0] -> 'a'
}

let arr = ['Alice', 'Bob'];

interface NumberDictionary {
    [index: string]: number;  // arr['propName'] -> 1
    length: number;  // 可以，length是number类型  arr['length']/arr.length -> 0
    // name: string;  // 错误，name是string类型   arr['name']/arr.name -> 'a'
}

 // 混合类型
 interface Counter {
     (start: number): string;
     interval: number;
     reset(): void;
 }

/* 这个可以分开来理解
 * interface Counter { (start: number): string; } 这样对应的就是个函数
 * interface Counter { interval: number; reset(): void } 这样对应的就是一个对象
 * 将上述合起来就是混合类型，因为函数本身也是对象，所以，作为一个函数，对应函数的那个，作为一个对象，有两个静态变量
 */

function getCounter(): Counter {
    // 这样的写法是错误的，因为左边声明的是Counter混合类型，而右边的又只是函数，并不是混合类型，所以要用<Counter>强制类型转换
    // let counter: Counter = function (start: nubmer): string { return 'a'; };
    let counter: Counter = <Counter>function (start: number): string { return 'a'; };
    // let counter: Counter = function (start: number): string { return 'a' } as Counter;  // 直接用as类型断言也可以
    counter.interval = 0;
    counter.reset = function (): void { };

    return counter;
}

let c = getCounter();
console.log(c(10), c.interval, c.reset());