public class TypeConversion {
    public static void main(String[] args) {
        // 子类元素可以赋给父类变量，因为子类是父类的一种，要将父类元素赋给子类，必须通过强制类型转换
        Father f = new Son("S", 0);
        // 此处打印S，多态，虽然f的类型是Father，但是虚拟机知道f的实际类型，会调用f实际类上的对应方法
        f.print();
        // f.getId(); // 这是错误的，虽然f指向的值是Son类型的，但是f变量是Father类型的，只能调用Father类型存在的方法
        // 调用Son类型上的方法，注意此处是将父类变量f赋给子类，必须通过强制类型转换，将f变量转成实际指向的Son类型变量s，类型不匹配时会报错
        Son s = (Son) f;
        s.printId();
    }
}

class Father {
    private String name;
    public Father(String n) {
        name = n;
    }
    public void print() { System.out.println(name); }
    public String getName() { return name; }
}

class Son extends Father {
    private int id;
    public Son(String n, int i) {
        super(n);
        id = i;
    }
    public void print() { System.out.println(super.getName()); }
    public void printId() { System.out.println(id); }
}