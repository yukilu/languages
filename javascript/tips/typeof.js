const arr = [];
const type = typeof arr;  // typeof会计算出值，赋给type，类似的还有instanceof，in等

// 判断一个值是不是undefined时，直接判断该值是否是undefined，或者判断该值类型是否是undefined
// 但是注意，用typeof时候，typeof返回的是个字符串，所以typeof a === 'undefined'，和字符串作比较，千万不要忘了引号
let a;
let isUndefined = a === undefined;
isUndefined = typeof a === 'undefined';

// 上述两个比较方法还有个区别就是，如果判断没有声明过的值时，就不能用 b === undefined 这种方式，会报错，只能用typeof
// isUndefined = b === undefined，这样会报错，b is not defined
isUndefined = typeof b;