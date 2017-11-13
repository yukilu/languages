// 来理一下js中各函数及原型对象间的关系，以及一些奇特的特性
// 以下的 ==, instanceof 返回值都是true

// 先来最简单的构造函数及其实例
function A() { }

let a = new A;

a.__proto__ == A.prototype;
a instanceof A;

// A.prototype是个对象，所以A.prototype是Object构造函数的一个实例，
// 可知任意函数f.prototype.__proto__ == Object.prototype，即任意函数f伴生的prototype(除了Object.prototype)都是由Object构造的
A.prototype.__proto__ == Object.prototype;
A.prototype instanceof Object;

// A是一个函数，所以A是Function构造函数的一个实例
// 可知任意构造函数本身都是由Function构造的，都是Function类的一个实例
A.__proto__ == Function.prototype;
A instanceof Function;


// 首先来查看Object构造函数，Object函数是由Function构造的，即Object是Function类的一个示例
Object.__proto__ == Function.prototype;
Object instanceof Function
// 而Object.prototype并非由Object自身构造，作为原型链的顶层，其__proto__是null
Object.prototype.__proto__ == null;

// Object构造函数是Function类的一个实例，而Function的父类是Object，逻辑推理可知Object是属于Object类的
// 从原型链角度来看
Object.__proto__ == Function.prototype;  // Object instanceof Function
Function.prototype.__proto__ == Object.prototype;  // Function.prototype instanceof Object
// 可得
Object.__proto__.__proto__ == Object.prototype;
// 即Object的原型链上存在Object.prototype，即Object本身属于Object类
Object instanceof Object;


// 来查看Function构造函数

// Function构造函数构造了所有的函数，包括Object，甚至连Function函数本身也是由自己构造的，即Function是自身的一个实例
// 而由这个特性可以推导出很多奇特的性质，下面会有示例
Function.__proto__ == Function.prototype;
Function instanceof Function;
// 但是Function.prototype竟然是个函数
typeof Function.prototype === 'function';

// 而Function.prototype作为一个对象，是由Object构造的，由原型链定义知Object是Function的父类
Function.prorotype.__proto__ == Object.prototype;
Function.prototype instanceof Object;

// 由于任意函数都是Function类的实例，而Object又是Function的父类，所以任意函数(包括Function本身)都是Object类的
A.__proto__ == Function.prototype;
Funciton.prototype.__proto__ == Object.prototype;
// 由上可以推导出Object.prototype存在于任意函数(包括Function本身)的原型链上，这也就是为什么说函数也是对象
// 而任意对象(Object.create(null)和Object.prototype除外)的原型链上也存在Object.prototype，所以一切皆对象
A.__proto__.__proto__ == Object.prototype;
A instanceof Object;

// Function本身是Function类的一个实例，又Function的父类是Object，逻辑推理可知Function是属于Object类的
// 本质上要从原型链角度看，以上关系翻译成原型链如下
Function.__proto__ == Function.prototype;  // Function instanceof Function
Function.prototype.__proto__ == Object.prototype  // Function.prototype instanceof Object
// 可得
Function.__proto__.__proto__ == Object.prototype;
// 即Function的原型链上存在Object.prototype，即Function也属于Object类
Function instanceof Object;


/* 综上：
  1. 任意函数(包括Function自身)都是Function类的
     A instanceof Function
     Function instanceof Function
  2. 一切(包括函数)皆对象
     任意对象(Object.create(null)及Object.prototype除外)及函数(包括Object)的原型链上都存在Object.prototype，即都是Object类的
     A instanceof Object
     Function instanceof Object
     Object instanceof Object
 */