/* i = 0;
 * let i;
 * 上面这种写法是会报错的，但像下面先将i写入函数中是没问题的，因为函数中的代码只有调用时才会执行，这时候i已经经let声明过了
 * let, const都相同，还有就是不同script标签下，let，const和var一样都是可以穿透的，即共用，script不会像函数那样形成独立的作用域
 */

function test() {
    console.log(i);
}

let i = 0;
test();  // 0