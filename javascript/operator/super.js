// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super

/* super引用只存在于方法简写之内，其他上下文中使用super会报错
 * let friend = {
 *      getGreeting: function () {
 *        return super.getGreeting() + ', hi!';    // 语法错误
 *     }
 * };
 * 
 * 1. super用在构造函数中时，表示父类构造器
 * 2. super用在方法中时，super指向当前方法所属对象(即当前方法的[[HomeObject]])的原型对象([[prototype]]/__proto__)
 *es6中队方法进行了定义，ES6 则正式做出了定义：方法是一个拥有 [[HomeObject]] 内部属性的函数，此内部属性指向该方法所属的对象
 */

let person = {
    getGreeting() {
        return 'Hello';
    }
};

let friend = {
    getGreeting() {
        return super.getGreeting() + ', hi!';
    }
};
Object.setPrototypeOf(friend, person);

let relative = Object.create(friend);

// super引用并非是动态的，它总能指向正确的对象，此处super.getGreeting 指向 person.getGreeting，而不管多少对象继承了此方法
console.log(person.getGreeting());    // Hello
console.log(friend.getGreeting());    // Hello, hi!
console.log(relative.getGreeting());    // Hello, hi!

/* 当上述规则应用于原型继承时，静态方法中，super表示父类中同名静态方法，普通方法中super表示父类中的同名普通方法
 * 实际上class是个语法糖，本质还是原型继承，而继承又分为两种情况，静态方法的继承和非静态方法的继承
 * class Father, class Son，本质上Father和Son就是函数，是对应的constructor函数，而js中函数也是对象，所以静态方法挂载在Father,Son函数上，
 * 而普通方法是在Father.prototype和Son.prototype上
 * 当Father extends Son 时，Son.__proto__指向Father，所以Son能继承Father上的静态函数，而Son.prototype.__proto__指向Father.prototype，
 * 所以Son的实例可以调用Father原型上的方法
 *
 * 对于super来说，不论出于静态方法还是普通方法中时，都符合上述规则
 * 1. 当super位于Son静态函数中时
 * Son.staticMethod中，该staticMethod的[[HomeObject]]就是Son，然后super指向[[HomeObject]]即Son.__proto__，就是Father，
 * 所以super -> Father，在Son.staticMethod中调用super.staticMethod时，调用的就是Father.staticMethod
 *
 * 2. 当super位于Son的原型对象上的方法中时
 * 如Son的实例s = new Son(0, 's')，当调用s.method()时，该method由于是在原型对象上的，即method位于Son.prototype上，所以method的[[HomeObject]]
 * 是Son.prototype，所以其中的super指向[[HomeObject]]的__proto__，即Son.prototype.__proto__，就是Father.prototype，所以在Son实例s上
 * 调用method函数时，其中的super.method就是Father.prototype.method
 *
 * 总结:
 *     super用在方法中时，super指向当前方法所属对象的原型对象(__proto__)
 *     应用于继承时，应用上述规则的结果就是子类中不论静态方法还是普通方法中的super均对应父类中的同名方法
 */

class Father {
    constructor(id) {
        this.id = id;
    }
    static staticMethod() {
        return 'father_static';
    }
    method() {
        return 'father_method';
    }
}

class Son extends Father {
    constructor(id, name) {
        super(id);
        this.name = name;
    }
    static staticMethod() {
        return super.staticMethod() + ' son_staticMethod';
    }
    method() {
        return super.method() + ' son_method';
    }
}

let s = Son(0, 's');
console.log(s.staticMethod());
console.log(s.method());