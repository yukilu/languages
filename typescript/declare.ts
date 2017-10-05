// 对象声明

// 1.在冒号后跟大括号{...}声明，其实就是interface声明的简写形式
let v: { a: number } = { a: 0 };

// 2.字面量对象通过接口声明
interface A { a: number; }
let va: A = { a: 0 };  // 通过interface声明

// 3.new产生的类对象通过类声明
class B { b: string; }
let vb: B = new B;  // new B()括号是可以省略的，new产生的实例通过类来声明


// 函数声明

/* 1.在冒号后跟类型声明可以有两种写法
 *   1)大括号写法      { (arg: type): returnType }   其实就是interface声明的简写形式
 *   2)箭头函数式写法  (arg: type) => returnType     函数特有的声明形式，注意这里即使单个参数时，小括号也不能省略
 * 同时后面跟的函数也有两种写法
 *   1)匿名函数写法  function (arg: type): returnType { ... }
 *   2)箭头函数写法  (arg: type) => { ... }
 * 第一个就是普通声明，第二个用了箭头函数，注意声明类型中的箭头与箭头函数中的箭头是不同的，前者表示返回值类型，后者表示返回具体值
 */
let f: { (a: number): string } = function (a: number): string { return 'f'; };
let fa: { (a: number): string } = (a: number): string => 'f';
let fb: (a: number) => string = function (a: number): string { return 'f'; };
let fc: (a: number) => string = (a: number): string => 'f';


// 2.用接口来声明
interface Fn {
    (a: number): string;  // 这里不能用 =>
}
let ff: Fn = (a: number): string => 'f';

// 注意为函数声明与作为类的接口的声明的区别，声明函数时没有名字，而作为类的接口时，声明类应该实现的方法时是有名字的
interface someInterface {
    someMethod(arg: number): string;
}

class someClass implements someInterface {
    someMethod(arg: number): string {
        return 'someValue';
    }
}