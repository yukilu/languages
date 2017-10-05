// interface可以声明函数类型，但是构造函数声明比较特殊

// interface声明普通函数
interface f {
    (arg: number): string;
}

// interface声明构造函数，用new来标示这是个构造函数声明，注意，由于是个函数，这里是要写明返回值类型的
interface ctor {
    new (arg: number): MyClass;
}

// 类中的constructor符合ctor构造函数声明
class MyClass {
    arg: number;
    constructor(arg: number) {
        this.arg = arg;
    }
}

// 工厂函数，c为构造函数，类型对应ctor构造函数声明
function factory(c: ctor, arg: number): MyClass {
    return new c(arg);
}

factory(MyClass, 0);

// 在es6中，类是语法糖，本质上也是函数，所以类中的constructor函数就是C函数，在类中是个静态变量
// 但实际上在C.prototype上是存在一个constructor属性的，它指向构造函数C
class C {
    a: number;
    constructor(a: number) {
 // constructor(a: number): C {  // 注意这种写法是错误的，同java相同，类中的构造函数是没有返回值的，所以不能在后面声明返回值类型
        this.a = a;
    }
    method(arg: string):void { }
}

// 上述类实际上是下面写法的语法糖
// 直接定义的构造函数就是普通函数，与class中的constructor不同，是有返回值的，只不过new的时候会将其中的this指向创建的对象而已
function Cf(a: number): void {
    this.a = a;
}

Cf.prototype.method = function (arg: string):void { };