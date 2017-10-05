// const和readonly作用相似，使用地方不同

// const作用在变量上
const a: number = 0;

// readonly作用在属性上，只读属性必须在声明时或构造函数里被初始化
// readonly可以加参数属性 public private protected
class A {
    readonly a: string;
    readonly b: number = 0;
    private readonly c: boolean = true;
    protected readonly d: number = 1;
    constructor(v: string) {
        this.a = v;
    }
}