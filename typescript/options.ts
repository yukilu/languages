// 额外的属性检查
// 参考链接： https://www.tslang.cn/docs/handbook/interfaces.html

interface SquareConfig {
    color ?: string;
    width ?: number;
}

function createSquare(config: SquareConfig): void { }

// 正确传参
createSquare({ color: 'red', width: 0.5 });

// 字面量对象传入的是colour而非color， 对象字面量会被特殊对待而且会经过额外属性检查，当将它们赋值给变量或作为参数传递的时候。
// 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。
createSquare({ colour: 'red', width: 0.5 });  // 会报错

// 绕开上述的额外属性检查有以下两种方法
// 1.类型断言
createSquare({ colour: 'red', width: 0.5 } as SquareConfig);

// 2.将这个对象赋值给一个变量，因为正如上面讲的，参数直接传入字面量对象时会被特殊对待而且会经过额外属性检查，
// 而变量squareOptions当参数传入时不会经过额外属性检查，所以编译器不会报错。
let squareOptions = { colour: 'red', width: 0.5 };
createSquare(squareOptions);

// 3.接口添加字符串索引签名
interface SquareConfigure {
    color ?: string;
    width ?: number;
    [propName: string]: any;
}