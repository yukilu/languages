# yield from是将from后的迭代器代理当前迭代器，即先迭代完from后面的迭代器，再继续当前函数中的迭代器

def g1():
    yield 0
    yield 1
    yield 2

def g2():
    yield 'a'
    yield from g1() # next执行到这里时，就进入g1中的yield，当g1中yield结束时，再继续当前函数yield
    yield 'b'
    yield 'c'

it = g2()
for i in range(6):
    print(next(it))  # a -> 0 1 2 -> b c