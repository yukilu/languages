// 中括号用来计算属性名，中括号就是个操作符，用来计算属性名的值

let name = 'fullName';

let person = {
    id: 0,
    'age': 16,
    [name]: 'Bond'  // 中括号计算[name] -> ['fullName']，返回值为 'fullName'，等同于 'fullName': 'Bond'
};

/* 可以看到在字面量中，可以有三种方法表示键名，其实字面量对象的键名应该是字符串类型(或Symbol  类)
 * 即'age'(或双引号 "age")这种形式才是标准的，id(不带引号)只是简写，[name]是通过中括号来计算出属性名对应的值
 * [name]可以看成是计算属性名，其结果是返回一个字符串
 */

let a = 'a';
let b = 'b';

person['p' + a] = 'pa';  // person['p' + a] -> person['p' + 'a'] -> person['pa']
person['p' + b] = 'pb';

let anotherPerson = {
    ['p' + a]: 'apa',  // ['p' + a] -> ['p' + 'a'] -> ['pa'] -> 'pa' => 'pa': 'apa'
    ['p' + b]: 'apb'
};