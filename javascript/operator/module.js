/* es6的模块化标准，阐释了export，import的具体用法
  * export后面必须跟声明或者表达式，不能是变量或者字面量对象
  * 1. 声明: export const a = 0; export function f() {}; export class C {};
  * 2. 表达式(即先声明变量，再通过export后面跟大括号{}): const a = 0; function f() {}; class C {}; export { a, f, C };
  * 错误示例:
  * 1. 直接跟变量 const a = 0; export a;
  * 2. 直接跟字面量对象 export { a: 0 };   { a: 0 }会被解读为a: 0代码，而不是字面量对象{ a: 0 }
  * 
  * export { member }, import { member } from 'module-name'是最基本的用法
  * export及import后面跟的{}大括号不是字面量对象的简写形式，而是将大括号作为一个代码块，里面包含了as及逗号操作符
  * 就如同if,switch,函数等后面跟的大括号的作用，export，import是个关键字，后面的大括号中的内容直接解读为代码
  * 
  * 还有个大括号解读为代码的一种特殊情况为，行首的大括号{}也会解读为代码，所以写在行首时，{}.toString()是不对的(不写在行首这种
  * 写法自然没问题)， 要写成({}).toString()，因为在行首时，{}不会被解读为空对象，而是被解读为代码块的大括号，自然代码块为空，
  * 后面也不能跟点操作符，为了不被解读为代码块，所以第一个字符不能是大括号，得用小括号括起来，或者用！ ~ 等位操作符也可
  */ 

// export

// 1.export{ member,... }
// 下面两种写法是等价的，直接声明或者定义时export
export const member = 0;
export function f() {};  // 必须指定名字，不能为匿名

// 或者先声明变量，然后通过大括号{}export
const member = 0;
function f() {}
export { member, f };

//注意必须用大括号{}来export,所以下述写法是错误的
const member = 0;
export member;  //正确写法为 export { member }

// export的时候指定别名，与import同
const member = 0;
export { member as alias };

// 2.export default与上面export不同，不需要大括号{}，直接跟变量，函数或类等，并且函数，类可以匿名，即省略函数名或类名，default只能有一个
export default function f() {};  // 等同于 export { f as default };
export default  function () {};  // 类，函数名字皆可省略

//3. export from
export * from 'module-name';
export { member, member1 } from 'module-name';
export { member as alias, member1 as alias1 } from 'module-name';


// import

import { member, member1 } from 'module-name';  // 最基本的方式
import { member as alias, member1 as alias1 } from 'module-name';  // 上述指定别名用法

import * as name from 'module-name';  // 相当于将模块内所有内容导出为name对象

import defaultMember from 'module-name';   // 相当于 import { default as defaultMember } from 'module-name';

import 'module-name';  // 导入整个模块