// 中括号用来计算属性名，中括号就是个操作符，用来计算属性名的值

// 中括号计算字符串的结果就是字符串，['s'] => 's'，但是o['s']的中括号不仅会计算属性值，还多了一个作用，即取对象o上键名为's'的值
let o = { a: 0 };
console.log(o.a);  // 0
console.log(o['a']);  //0
// 下面的例子是可以的，因为[]作用于字符串返回字符串，所以[['a']]中内层中括号['a']的结果为'a'，则o[['a']] -> o['a'] -> 获取o中键名为'a'的键值
console.log(o[['a']]);  // 0
// 所以不论外面套多少层中括号，都是可以的，最终计算结果都为o['a']
console.log(o[[['a']]]);  // 0

// 但是注意键名为Symbol时，略有不同
let b = Symbol('b');
o[b] = 1;
console.log(o[b]);  // 0
console.log(o[[b]]);  // 会报错，TypeError: can't convert symbol to string，看来多层嵌套时，会有将值转成字符串的操作，不知道是不是bug

// 来看字面量中的键名
let name = 'fullName';
let location = Symbol('location');

let person = {
    id: 0,
    'age': 16,
    [name]: 'James Bond',  // 中括号计算[name] -> ['fullName']，返回值为 'fullName'，等同于 'fullName': 'Bond'
    // 由于[]是计算属性名，所以这种写法也是可以的 ['lastName'] => 'lastName'，中括号计算出属性名就是字符串'lastName'
    ['lastName']: 'Bond',
    // 中括号计算Symbol类的属性名，与字符串同理，返回值应该也是Symbol类，但是由于Symbol类的值无法直接表示，所以只能先把返回值存变量里，
    // 然后通过中括号计算表示 [symbol]
    [location]: 'Tokyo'
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