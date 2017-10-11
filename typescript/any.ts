// 声明为any类型时，类型检查器就不会对该变量进行类型检查，而直接编译

// 由于any类型的变量不做类型检查，所以any类型变量可以接受任何类型的值，any类型的变量也可以赋给任何类型的变量
let va: any = 'a';
let vn: any = 'b';
let vb: number = 0;

// 1. any类型的变量可以接受所有类型
va = vb;  // any = number

// 2. any类型的变量可以赋给所有类型
vb = vn;  // number = any

// 但是通过any绕开类型检查会出一些奇怪的问题
let sa: any = 'a';
let sb: number = sa; // sb的值应该是number类型的，但是被any类型的变量sa赋予了字符串类型的'a'
console.log(sb);

// any类型的函数签名同理
function fa(arg: any): any { return arg; }
function fn(arg: number): number { return arg; }

// any类型的签名可以接受任何类型，any类型的签名可以赋给任何类型
let a: (arg: any) => any = fn;
let b: (arg: number) => number = fa;

// 与上面的问题一致，变量a指向fn函数，但是fn函数定义时只接受number类型变量，但是a调用时却可以接受任何类型的参数
// 应该是由于fn赋给a之后，a是any类型的签名，不会对a做类型检查，所以用a调用函数时，不会限定参数类型
console.log(a('1'));
console.log(b(0));