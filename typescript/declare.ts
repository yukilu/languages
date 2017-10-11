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

/* 需要注意的是，typescript比较类型时是看类型结构的，而不是看名字的，所以只要类型结构相同，不同名字的类或不同名字的接口，
 * 甚至类和接口分别定义的类型都可以通用，private和protected例外(限定符只存在类中，接口中无限定符，类实现接口中定义的方法
 * 和属性时，对应的限定符为public，即接口只定义公有方法和属性)，即使类型结构相同，也认为是不同的属性
 * 参考链接: https://www.tslang.cn/docs/handbook/type-compatibility.html */
interface IA { a: number; }
interface IB { a: number; }
class CA { a: number; }
class CB { a: number; }

let ia: IA;
let ib: IB;
ia = ib;  // 可以，虽然接口名字不同，但类型相同，可以通用

let ca: CA;
let cb: CB;
ca = cb;  // 可以，虽然类名字相同，但类型相同，可以通用

ia = ca;  // 可以，虽然一个是接口类型，一个是类类型，但类型相同，可以通用

// 限定private或protected时，相同属性类型也认为是不同的，下面举了private的例子，protected同理，不再赘述
class CC { private a: number; }
class CD { private a: number; }
let cc: CC;
ca = cc;  // 错误，public和private不能互通

let cd: CD;
cc = cd;  // 错误，private和private不能互通