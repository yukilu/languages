// 关于函数中this的指向问题，经常容易犯错
// this指向调用当前函数时的函数所在的对象

const o = {
    prop: 'o',
    f() {
        console.log(this.prop);
    },
    initial() {
        this.fbind = this.f.bind(this);
    }
};

o.initial();

const oa = {
    prop: 'oa',
    f: o.f,
    fbind: o.fbind
};

oa.f()  // 'oa'，并不是'a'，oa.f = o.f，调用oa.f时，f中的this指向oa
oa.fbind()  // 'a'，由于绑定了this，fbind调用时，f中this还是指向o(fbind中this指向oa)，具体原因参看下面bind函数

// Function.prototype上的bind大概就是以下写法
Function.prototype.myBind = function (target) {
    const that = this;
    return function (...args) {
        that.apply(target, args);
    }
};

/* bind中this指向调用bind的函数，可以知道，其实就是函数式，将原来函数包了一层，返回另一个函数，调用该函数，就会间接调用原来的函数，
 * 并通过apply强行修改了原来函数中this的指向，所以调用bind返回的函数，效果就好像是调用了原函数，并且原函数中this指向绑定的target
 * 其实在返回的fbind中，oa.fbind的this指向的并非是o，而是oa，只是在fbind中调用了f，并且f的this通过apply绑定到了o上
 */