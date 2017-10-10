/* interface的声明类型
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
 * 
 * 
 * interface的继承
 * 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约
 * 1. 但与java中不同的是，java中的接口是不能有实例域的，即属性，只能有未实现的方法，而typescript中是可以有实例域的
 * typescript中当类实现接口时，除了要实现接口中的方法细节，实例域(属性)也要一起写出来
 * 2. typescript的接口描述了类的公共部分(属性和方法)，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。
 * java8及8之前java的接口也只能表示公有接口方法(注意java接口不能包含实例域即属性，java接口只包含方法)，java9之后java接口也可以包含私有接口方法
 * 3. 当一个类实现了一个接口时，只对其实例部分进行类型检查，静态方法比如constructor不在检查范围内
 * 4. 接口可以继承类
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


// 类实现接口

// 1. 如上所述，java中接口不能包含实例域，ts中却可以，只是在类实现接口时，要将实例域(属性)一起写出
// 2. 接口只描述类的公共部分，所以在接口中并不存在private, protected, public修饰符，这些只在类中存在
interface MyInterface {
    a: number;
    getA(): number;
}

class MyClass implements MyInterface {
    a: number;
    getA(): number {
        return this.a;
    }
}

// 接口继承类

// 不继承具体实现，只继承类成员
class MyControl {
    public state: any;
    f(): number { return 0; }  // 默认为public
}

interface MySelectableControl extends MyControl {
    select(): void;
}

/* 接口MySelectableControl包含了MyControl中的类成员，相当于如下
 * interface MySelectableControl {
 *   public state: any;
 *   f(): number;
 *   select(): void;
 * }
 */

class MyImageA implements MySelectableControl { // 将上述包含三个成员的接口实现
    public state: any;
    select(): void { }
    f(): number { return 1; }
}

// 但是若类MyControl中的成员为私有，根据私有成员兼容性，情况就不同了

// 私有成员兼容性
// 成员公有时，不写访问权限时，默认public，ts只检查对应类型，而不是看类名，类型相同即可，不需要类名也相同
class PublicA { a: number }
class PublicB { a: number }
let pa: PublicA = new PublicA;
let pb: PublicB = new PublicB;
pa = pb;  // 类型相同，可以互通

// 当存在私有成员时，即使类型相同，也认为不同类之间私有成员是不同的
class PrivateA { private a: number; }
class PrivateB { private b: number; }
let pra: PrivateA = new PrivateA;
let prb: PrivateB = new PrivateB;
pra = prb;  // 错误，类型不同，不能互通

// 所以当接口继承的类含有私有成员时，只有被继承类的子类才能实现该接口，由于私有成员的兼容性问题，其他类是无法实现接口被继承类的私有成员的
class Control {
    private state: any;
}

interface SelectableControl extends Control { // 继承了类Control的私有成员state
    select(): void;
}

class Button extends Control implements SelectableControl { // Button是Control的子类，含有Control的私有成员state，可以实现上述接口
    select(): void { }
}

class MyImage implements SelectableControl { // 错误，不能实现上述接口
    private state: any;  // 私有成员兼容性问题，该state与Control类中的state不同
    select(): void { }
}