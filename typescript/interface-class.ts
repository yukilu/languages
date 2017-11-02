/* interface与class的区别
 * 1. 当只需要为某个变量声明类型，用interface，如果用类来声明，你会为此创建一个类，而大多数情况下，这是不必要的，因为大部分情况下，
 * 需要声明的变量结构都比较简单，不需要为此特地创建一个类，类比较适合用于复杂的结构。
 *    而当真的需要创建一个类时，类的实例对应的变量就应该声明为该类的类型。
 *    1) 当声明一个变量，而又不需要为此特地创建一个类时，用interface，如声明字面量对象
 *       interface A { a: number }    let ta: A = { a: 0 };
 *    2) 当需要创建一个类时，声明用new来创建的实例时，用对应的class
 *       class A { a: number }    let ta: A = new A();
 * 
 * 2. 若已存在的类和接口的数据结构一样时，那么类和接口都可以声明具有同样数据结构的变量，两者互相通用，
 * 但是，interface不能new，而class可以new。
 * 
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

interface InterfaceA {
    a: number;
    b: string;
}

class ClassB {
    a: number;
    b: string;
}

let t: { a: number; b: string } = { a: 0, b: 'b' };  // 直接在后面跟字面量对象式的类型声明

let ta: InterfaceA = { a: 0, b: 'b' }; // 字面量对象
// let taa: InterfaceA = new InterfaceA();  // interface不能new
let taa: InterfaceA = new ClassB; // new TestB()括号可省略，此处new了一个对象，只要符合接口类型也是可以的

let tb: ClassB = { a: 0, b: 'b' };  // 字面量对象，此处class作用与interface同
let tbb: ClassB = new ClassB();  // class可以new实例，而interface不能