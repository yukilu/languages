/* 通配符限定
 * 设有泛型类Pair<T> { ... }, Employee有子类Manager，Manager有子类Executive
 * Manager是Employee子类，但Pair<Manager>并不是Pair<Employee>子类
 * printBuddies(Pair<Employee> p) { ... }
 * 调用时可以传入Pair<Employee>类对象，但是由于Pair<Manager>不是其子类，所以无法传入Pair<Manager>类的对象，为了解决这个问题，引入了通配符
 * 
 * Pair<? extends Employee>，该类是Pair<Employee>和Pair<Manager>的父类，只要Pair<T>中的T是Employee的子类，那么该泛型类就是该类的子类
 * printBuddies(Pair<? extends Employee> p) { ... }
 * 这时调用时就可以传入Pair<Employee>, Pair<Manager>等泛型类型的对象，super同理，不再赘述
 * 
 * 需要注意的是
 * Pair<? extends Employee>表示Pair<Employee>, Pair<Manager>等的父类，但是 ? extends Employee 表示的是Employee及其子类中的某一类
 * Pair<? super Manager>表示Pair<Manager>, Pair<Employee>, Pair<Object>等的父类，但是 ? super Manager 表示的是Manager及其父类中的某一类
 * 
 * 假设Pair<T>类中有访问器方法和更改器方法
 * T getFirst() { return first; }
 * void setFirst(T t) { first = t; }
 * 
 * 当通配符类型为 ? extends Employee 时，两个方法是这样的
 * ? extends Employee getFirst()
 * void setFirst(? extends Employee)
 * 访问器get的返回值是Employee及其子类中的某一类，所以，只要用Employee类的变量接收其返回值即可，用父类变量接收子类返回值
 * Employee r = p.getFirst();
 * 更改器set的参数类型也是Employee及其子类中的某一类，假设传入了某Employee的子类对象，但通配符可以表示该传入的Employee子类对象的子类型，
 * 那么就是父类对象赋给子类变量，这就违背了父类对象不能赋给子类变量的规则，所以由于? extends Employee表示的Employee子类并没有底，
 * set更改器在子类限定中是无法使用的
 * void setFirst(T t)    // T = ? extends Employee 可以是Employee, Manager, Executive...中的某一类
 * Manager m = new Manager(...);
 * setFirst(m);    // 若T表示Executive类型，则相当于 Executive t = m; 父类变量赋给了子类变量，这是错误的
 * 
 * 当通配符类型为 ? super Manager 时，两个方法是这样的
 * ? super Manager getFirst()
 * void getFirst(? super Manager)
 * 访问器get的返回值是Manager及其父类中的某一类，所以，只能用Object类的变量才能接收器返回值，这就丢失了类型信息
 * Object r = p.getFirst();
 * 更改器set的参数类型是Manager及其父类中的某一类，所以只要传入Manager及其子类对象，就符合子类对象可以传给父类变量的规则
 * void setFirst(T t)    // T = ? super Manager 可以是Manager, Employee, Object...中的某一类
 * Executive ex = new Executive(...);
 * setFirst(ex);    // T表示的类型是Manager及其父类，T t = ex，无论T是何种类型，都是ex的父类，都符合子类变量传给父类变量的规则
 * 
 * 具体例子如下所示
 */

public class Wildcard {
    public static void main(String[] args) {
        Employee e1 = new Employee("E1", 10);
        Employee e2 = new Employee("E2", 20);
        Manager m1 = new Manager("M1", 50, 100);
        Manager m2 = new Manager("M2", 100, 200);

        Pair<Employee> pe = new Pair<>(e1, e2);
        Pair<Manager> pm = new Pair<>(m1, m2);

        printBuddies(pe);
        printBuddies(pm);

        setEx(pe);
        setEx(pm);

        printBuddies(pe);
        printBuddies(pm);
    }

    public static void printBuddies(Pair<? extends Employee> p) {
        Employee first = p.getFirst();
        Employee second = p.getSecond();
        System.out.println(first.getName() + " and " + second.getName());
    }

    public static void setEx(Pair<? super Manager> p) {
        Executive ex1 = new Executive("Ex1", 200, 200, 1000);
        Executive ex2 = new Executive("Ex2", 200, 200, 2000);

        p.setFirst(ex1);
        p.setSecond(ex2);

        Object first = p.getFirst();
    }
}

class Employee {
    private String name;
    private int salary;
    public Employee(String n, int s){ name = n; salary = s; }
    public String getName() { return name; }
}

class Manager extends Employee {
    private int bonus;
    public Manager(String n, int s, int b) { super(n, s); bonus = b; }
}

class Executive extends Manager {
    private int stock;
    public Executive(String n, int s, int b, int sk) { super(n, s, b); stock = sk; }
}

class Pair<T> {
    private T first;
    private T second;
    public Pair(T f, T s) { first = f; second = s; }
    public void setFirst(T t) { first = t; }
    public T getFirst() { return first; }
    public void setSecond(T t) { second = t; }
    public T getSecond() { return second; }
}