// 不使用泛型接口或泛型类时，就要经常强制类型转换参数，使用泛型之后就不需要再强制类型转换了

public class Generic {
    public static void main(String[] args) {
        MyClass a = new MyClass(10);
        MyClass b = new MyClass(20);
        System.out.println(a.compareTo(b));

        GenClass ga = new GenClass(10);
        GenClass gb = new GenClass(20);
        System.out.println(ga.compareTo(gb));
    }
}

// 接口中定义的参数类型是Object，当MyClass类实现该接口时，为了保证函数签名一致，在MyClass类中的CompareTo的参数也必须是Object类型的
// 虽然传入的参数类型实际上是MyClass类型的，所以在函数体中使用other变量时，要对其进行强制类型转换为实际指向的类型，才能访问其salary值
interface MyComparable {
    int compareTo(Object other);
}

class MyClass implements MyComparable {
    private int salary;
    public MyClass(int s) {
        salary = s;
    }
    public int compareTo(Object other) {
        MyClass m = (MyClass) other;
        int otherSalary = m.salary;
        if (salary > otherSalary)
            return 1;
        else if (salary < otherSalary)
            return -1;
        return 0;
    }
}

// 定义了泛型接口，类继承时，可以直接指定实现的接口中的compareTo的参数类型，这样就可以避免强制类型转换
interface GenericComparable<T> {
    int compareTo(T other);
}

class GenClass implements GenericComparable<GenClass> {
    private int salary;
    public GenClass(int s) {
        salary = s;
    }
    public int compareTo(GenClass other) {
        int otherSalary = other.salary;
        if (salary > otherSalary)
            return 1;
        else if (salary < otherSalary)
            return -1;
        return 0;
    }
}