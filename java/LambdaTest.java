/* java8新增加的lambda表达式，就是python中的lambda函数及es6中的箭头函数
 * 参数未指定类型时，类型会自动推断，或者还能用 :: 将方法转换成lambda表达式
 * 编译器会将lambda表达式解析成当前类的私有静态函数
 * 
 * 实际上lambda表达式的真正类型是实现了函数接口的匿名内部类，函数接口指的是只提供了一个方法的普通接口
 * public interface Consumer<T> { void accept(T t); }
 * 
 * 可以把lambda表达式赋值给对应的函数接口类型的变量
 * Consumer<Integer> consumer = x -> System.out.println(x);
 * integers.forEach(consumer);
 */

import java.util.*;

public class LambdaTest {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1,2,3,4,5);
        // list.forEach((Integer n) -> System.out.println(n))
        // list.forEach(n -> System.out.println(n));  // 如果参数n的类型未指定，编译器会自己推断

        list.forEach(System.out::println);  // 用 :: 将类的方法转成了lambda表达式
    }
}