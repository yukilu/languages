// 联合类型，即联合了几种类的类，以此定义的变量类型是联合类型的几种类中的一种
type unionType = number | string;
let a: unionType = 0;
let b: unionType = 'b';

// 字符串字面量类型，即是联合类型的一种特殊类，以此定义的变量类型是该类型定义的几个字符串的一个
type stringLiteral = 'a' | 'b' | 'c';
let sa: stringLiteral = 'a';
let sb: stringLiteral = 'b';
let sc: stringLiteral = 'c';

// keyof操作符，返回值为对象上已知的公共属性名的联合的字符串字面量类型
interface Person {
    name: string;
    age: number;
}

let personProps: keyof Person;  // 'name' | 'age'
personProps = 'name';
personProps = 'age';