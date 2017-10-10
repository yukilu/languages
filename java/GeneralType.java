// 某些方法为了适用所有类，就用Object类来声明了参数及返回值类型，若要将返回值赋给其实际类型的变量，需要对返回值进行强制类型转换

public class GeneralType {
    public static void main(String[] args) {
        MyClass m = new MyClass();
        SomeClass s = new SomeClass();
        // m.someMethod返回值为Object类型，为了能赋给SomeClass类的result变量，需要强制类型转换为其实际类型SomeClass类
        SomeClass result = (SomeClass) m.someMethod(s);
    }
}

class MyClass { // 某些方法为了能让所有类通用，就使用Object类声明参数及返回值类型
    Object someMethod(Object o) {
        Object other = o;
        return other;
    }
}

class SomeClass { }