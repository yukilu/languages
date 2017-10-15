// 泛型约束
// 参考链接: https://www.tslang.cn/docs/handbook/generics.html

// 简单的例子
function len<T>(a: T): number {
    return a.length;  // 这样是错误的，T可以是任意类型，不一定有length属性，所以要使用泛型约束
}

interface Lengthwise {
    length: number;
}

function leng<T extends Lengthwise>(a: T): number {
    return a.length;
}

/* 由于typescript没有java的通配符，所以像如下例子只能通过泛型函数在外面指定T类型
 * 
 * Manager是Employee子类，但是Pair<Manager>缺 不是Pair<Employee>子类
 * 所以假设有如下函数(java写法)
 * printBuddies(Pair<Employee> p) { ... }
 * Pair<Employee> pe = new Pair<>(...)
 * Pair<Manager> pm = new Pair<>(...)
 * printBuddies(pe);
 * printBuddies(pm); // 错误，pm类型Pair<Manager>并不是pe类型Pair<Employee>子类
 * 
 * 所以java引入了通配符 Pair<? extends Employee>是Pair<Employee>和Pair<Manager>父类，函数可以写成如下形式
 * printBuddies(Pair<? extends Employee> p) { ... }
 * 由于Pair<Employee>和Pair<Manager>是Pair<? extends Employee>子类，所以上述函数可以传入Pair<Employee>和Pair<Manager>类型变量
 * printBuddies(pe);
 * printBuddies(pm);
 * 
 * 而typescript没有通配符，所以并不能限定Pair<T>中T的类型，只能用泛型函数，以此在函数外面指定Pair中的类型
 * printBuddies<T extends Employee>(p: Pair<T>) { ... }
 */

class Pair<T> {
    constructor(private a: T, private b: T) { }
    setA(ta: T): void { this.a = ta; }
    setB(tb: T): void { this.b = tb; }
    getA(): T { return this.a; }
    getB(): T { return this.b; }
}

class Employee {
    constructor(private name: string) { }
    getName(): string { return this.name; }
}

class Manager extends Employee {
    constructor(n: string, private id: number) { super(n); }
    getId(): number { return this.id; }
}

function printBuddies<T extends Employee>(p: Pair<T>): void {
    let a: T = p.getA();
    let b: T = p.getB();
    console.log(a.getName() + ' and ' + b.getName());
}

let pe: Pair<Employee> = new Pair<Employee>(new Employee('ea'), new Employee('eb'));
printBuddies<Employee>(pe);

let pm: Pair<Manager> = new Pair<Manager>(new Manager('ma', 0), new Manager('mb', 1));
printBuddies<Manager>(pm);