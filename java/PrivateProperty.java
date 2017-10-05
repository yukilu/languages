// 基于类的访问权限，一个方法可以访问所属类的所有对象的私有数据，因为方法是类的所有实例共享的，而不是每个实例独立拥有的

public class PrivateProperty {
    public static void main(String[] args) {
        Employee e = new Employee("Alice", 10);
        Employee o = new Employee("Bob", 20);
        e.equals(o);
        e.changePrivate(o);
    }
}

class Employee {
    private String name;
    private int salary;
    public Employee(String n, int s) {
        name = n;
        salary = s;
    }
    // 不仅访问了当前实例的私有域，还访问了同类其他实例的私有域，这是合法的，因为other也是Employee类的
    // 方法是同类所有实例共享的，所以在方法中可以访问同类所有实例的私有域，同理像下一个函数一样修改同类实例的私有域，也是可以的
    public boolean equals(Employee other) {
        return name.equals(other.name);
    }
    public void changePrivate(Employee other) {
        System.out.println("Former salary is " + other.salary);
        other.salary *= 10;
        System.out.println("Now salary is " + other.salary);
    }
}