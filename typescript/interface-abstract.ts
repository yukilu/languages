/* 接口与虚类的区别
 * 接口不包含细节，虚类可以包含成员实现细节，虚类只要有一个成员是虚函数，就必须写成虚类，
 * 虚函数不包含细节与接口中成员相同，但是虚类中其他成员是可以包含细节的
 * 
 * 参考链接： https://www.tslang.cn/docs/handbook/classes.html
 */

interface AnimalA {
    name: string;
    makeSound(): void;
    move(meter: number): void;
}

abstract class AnimalB {
    name: string;
    abstract makeSound(): void;
    move(meter: number): void {
        console.log(`${this.name} moves ${meter}.`);
    }
}