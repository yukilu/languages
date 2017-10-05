/* interface与class的区别
 * 1. 当只作为对象的类型声明时，作用都相同，如ta,tb，甚至可以像t一样，直接后面跟类型声明
 * 2. interface不能new，而class可以new，所以两者用途不同
 *    1) 当声明字面量对象或者函数类型时，用interface
 *       interface A { a: number }    let ta: A = { a: 0 };
 *    2) 当声明用new来创建的对象时，用class
 *       class A { a: number }    let ta: A = new A();
 * 3.类只能单继承类，但类可以多继承接口，同时接口之间也可以互相继承(extends)，接口还能继承类
 *    subClass extends classA
 *    classA implements interfaceA    classB implements interfaceA, interfaceB
 *    classA implements classB    classA implements classB, classC
 *    subClass extends classA implements interfaceA
 * 
 *    subInterface extends interfaceA    subInterface extends interfaceA, interfaceB  注意这里用的是extends而非implements
 *    interfaceA extends classA
 * 
 * interface与class之间的继承关系(继承接口可以多继承，继承类只能单继承)
 * 1. 接口继承接口(extends，不能用implements)
 *    interfaceA extends interfaceB(, interfaceC...)
 * 2. 接口继承类(extends,不能用implements)
 *    interfaceA extends classA
 *    接口继承类时，只继承属性及方法的声明，不继承具体细节，即相当于把classA退化为一个接口来看待，既然用了extends就没必要用implements了
 * 3. 类继承类（extends/implements)
 *   1) extends
 *    classA extends classB
 *   2) implements
 *    classA implements classB(, classC...)
 *    类之间继承可以用implements，不同于extends的是，implements会将class退化为interface，只继承属性及方法声明，而不继承具体细节
 * 4. 类继承接口(implements，不能用extends)
 *    classA implements interfaceA(, interfaceB...)
 * 由上可知，只有类继承接口时候用implements(不能用extends)，其他情况都是用extends
 * 
 * 参考链接： https://www.tslang.cn/docs/handbook/interfaces.html
 *           https://www.tslang.cn/docs/handbook/classes.html
 */

interface TestA {
    a: number;
    b: string;
}

class TestB {
    a: number;
    b: string;
}

let t: { a: number; b: string } = { a: 0, b: 'b' };  // 直接在后面跟字面量对象式的类型声明

let ta: TestA = { a: 0, b: 'b' }; // 字面量对象
// let taa: TestA = new TestA();  // interface不能new
let taa: TestA = new TestB; // new TestB()括号可省略，此处new了一个对象，只要符合接口类型也是可以的

let tb: TestB = { a: 0, b: 'b' };  // 字面量对象，此处class作用与interface同
let tbb: TestB = new TestB();  // class可以new实例，而interface不能