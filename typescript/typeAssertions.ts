/* 类型断言有两种方法
 * 1. 尖括号语法   <type>variable
 * 2. as语法    variable as type
 * 参考链接： https://www.tslang.cn/docs/handbook/basic-types.html
 */

let someValue: any = 'string';
let anotherValue: any = 'string';
// any -> string
let strLength: number = (<string>someValue).length;
let len: number = (anotherValue as string).length;