// 当在ts中使用结构，怎么声明变量类型

const o: { a: number, b: string } = { a: 0, b: 's' };

// 结构时是将左边的{ a, b }视为一个字面量对象的，所以{ a, b }其实是{ a: a, b: b }的简写
// 而由于声明了{ a: a, b: b }的字面量对象的类型，所以对应的变量名a, b也是相对应字面量上属性的类型
let { a, b }: { a: number, b: string } = o;

// 别名的类型声明同理，也是对应字面量的属性的类型
let { a: va, b: vb }: { a: number, b: string } = o;