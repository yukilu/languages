const array = [0, 1, 2, 3, 4, 5];

let result = 0;

function add(item) {
    result += item;
    return result;
}

/* 为什么下面第二种情况不对呢，是因为在这个函数内操作result，此时的result是属于这个函数的result，并非外部的result，并不会影响外部result
 * 的值，不论内部result的值如何变，外部result的值仍为0，他们是两个变量，只是同名而已，如右边注释，将内部result的名字改为resultIn就了然了
 * 正确的姿势如第三种做法所示，每次运行完，就同步改变外部result的值就可以了 */
function anotherAdd(result, item) {      //         function anotherAdd(resultIn, item) {
    result += item;                      //  ==>       resultIn += item;
    return result;                       //            return resultIn;
}                                        //         }

array.map(item => add(item));
// map时，每次调用anotherAdd，并传入了result和item，item在mapFn中存在，result在mapFn中不出在，就在外层即全局找，存在一个result，值为0
array.map(item => anotherAdd(result, item));  //不对
array.map(item => result = anotherAdd(result, item));

// 以上问题可以简化如下，传入a的change函数中给a赋为1，改变的是change函数内a的值，不会改变全局a的值，两个是不同的变量
let a = 0;

function change(a) {
    a = 1;
}

function changeGlobal() {
    a = 1;
}

change(a);
console.log(a);  // 0
changeGlobal();
console.log(a);  // 1

// 以上问题就是经典交换问题
function exchange(x, y) {
    const temp = x;
    x = y;
    y = temp;
}

let x = 0;
let y = 1;

exchange(x, y);
console.log(x, y);  // 0, 1，xy的值并未交换，因为全局xy的值和函数内的xy变量不是一个变量，即其内存地址不同，只是同名而已