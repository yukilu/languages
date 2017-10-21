# python的参数比较特别，有普通参数和关键字参数

def f(x, y):
    print('x=%d, y=%d' % (x, y))

# 普通参数调用
f(0, 1)  # x=0, y=1

# 关键字参数调用
f(y=0, x=1)  # x=1, y=0

# 非关键字可变长参数
# 类似于JavaScript中的...args  function f(...args) { return args; }  args是个数组
def f(*args):
    print(args)
    print('x=%d, y=%d' % args) # args本身是个元组 args = (0, 1)

f(0, 1)  # 元组 (0, 1)

nums = (0, 1)
f(*nums)  # 元组 (0, 1)

# 关键字可变长参数
def f(**kw):
    print(kw)

f(x='a', y='b')  # dict {'x': 'a', 'y': 'b'}

kw = { 'x': 'a', 'y': 'b' }
f(**kw)  # dict {'x': 'a', 'y': 'b'}