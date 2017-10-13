/* interface表示对象类型，对象中包含方法时，interface中的方法可以为
 * 1.对象自己的方法
 * 2.对象在原型链上的方法
 * 
 * 因为虽然interface可以表示对象字面量，但是接口最初的作用就是让类来实现的模型，即接口中的方法为类需要实现的公有方法，
 * 所以接口中的方法本身就该是原型链上的方法，后面表示对象字面量应该是typescript后来加入的功能
 */

interface Interface {
    method(arg: number): number; // 接口只是声明类型，不实现具体细节
}

class ClassA implements Interface { // 实现上述接口的类，这里只是演示一下类实现接口的功能
    method(a: number): number { return a; }
}

class ClassB { // 直接定义的类，与接口类型相同
    method(a: number): number { return a; }
}

// 符合，字面量对象，method方法是ia自己拥有的方法
let ia: Interface = {
    method(a: number): number {
        return a;
    }
};

// 符合，ClassB的实例符合Interface类型，然而要注意的是，ib上的method方法并非自己拥有的，而是ClassB.prototype上的方法，不过这样也是可以的
let ib: Interface = new ClassB;