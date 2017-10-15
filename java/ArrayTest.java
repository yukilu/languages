/* 注意java中数组与泛型的不同
 * Manager是Employee子类，若有泛型类Pair<T> { ... }，则Pair<Manager>并不是Pair<Employee>子类，两者没什么关系
 * 所以虽然 Employee e = new Manager(...); 是可以的
 * 但 Pair<Employee> p = new Pair<Manager>(...); 却是错误的
 * 而数组与泛型类不同
 * Employee[] = new Manager[10]; 却是正确的
 * 
 * 所以可以用Object类接收任意类型变量，Object[]数组也可以接收任意类型数组
 * Object o = new Employee(...);
 * Object[] oa = new Employee[10];
 */

import java.util.*;

public class ArrayTest {
    public static void main(String[] args) {
        E[] es = new M[10];  // 可以，数组，M是E子类，E[]类型变量es可以接收M[]类型数组

        ArrayList<E> eas = new ArrayList<M>();  // 错误，泛型类，ArrayList<E>并不是ArrayList<M>父类
    }
}

class E {
    private String name;
    public E(String n) { name = n; }
    public String getName() { return name; }
}

class M extends E {
    private int id;
    public M(String n, int i) { super(n); id = i; }
    public int getId() { return id; }
}