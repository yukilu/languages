// void(undefinde,null)相关

// 1.undefined类型的变量只能被赋予undefined和null
let u: undefined = undefined;
let u1: undefined = null;

// 2.null类型的变量只能被赋予undefined和null
let null_v: null = null;
let null_v1: null = undefined;

// 3.void类型的变量只能被赋予undefined和null
let v: void = undefined;
let v1: void = null;

// 4.undefined和null是所有类型的子类型,所以undefined和null及undefined和null类型的变量可以被赋给任意类型，而void类型的变量不能
let u2: undefined = undefined;
let null_v2: null = null;
let n1: number = u2;
let n2: number = null_v1;

let v2: void = undefined;
let s1: string = v2; // 错误，void类型的值不能赋给其他类型