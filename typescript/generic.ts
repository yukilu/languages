// 检查结构类型时，泛型本身的<T>只是用来限定类型的，不是结构的一部分

function identity<T>(arg: T): T {
    return arg;
}

function id(arg: any): any {
    return arg;
}

function idn(arg: number): number {
    return arg;
}

interface GenericIdentityFn {
    <T>(arg: T): T;
}

interface GenericIdFn<T> {
    (arg: T): T;
}

// <T>(arg: T) => T = <T>(arg: T) => T
let myIdentity: GenericIdentityFn = identity; // 可以，类型相同

// <T>(arg: T) => T = (arg: any) => any
let mIdentity: GenericIdentityFn = id; // 可以，any绕开了类型检查器

// <T>(arg: T) => T = (arg: number) => number
let mIdn: GenericIdentityFn = idn; // 错误，类型不符，因为mIdn可以接受任何指定的类型，而idn只能接受number，所以倒过来是可以的

// <number>(arg: number) => number = (arg: number) => number;
let myIdn: GenericIdFn<number> = idn; // 可以，类型相同

// <number>(arg: number) => number = (arg: any) => any
let myId: GenericIdFn<number> = id; // 可以，any绕开了类型检查器

// <number>(arg: number) => number = <T>(arg: T) => T;
// 可以，未指定类型的泛型函数可以赋给指定类型的泛型函数，因为mId调用时只接受number类型，identity可以接受任何类型，number只是其中一种
let mId: GenericIdFn<number> = identity;

// 泛型函数不能赋值，只能在调用的时候指定类型，而不能在使用函数指针时指定类型，因为函数就只有一个，不调用时限定类型就会出现多个同名函数
// let mId: GenericIdFn<number> = identity<number>;  // 错误，当函数指针使用时，只能写成identity，不能带类型，调用时才能指定类型

mId(0);
identity<number>(0);