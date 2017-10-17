#with的使用方法
#参考链接 https://www.ibm.com/developerworks/cn/opensource/os-cn-pythonwith/index.html

# with context_expression [as target(s)]:
#     with-body

# 等同于以下过程

# context_manager = context_expression
# exit = type(context_manager).__exit__  
# value = type(context_manager).__enter__(context_manager)
# exc = True   # True 表示正常执行，即便有异常也忽略；False 表示重新抛出异常，需要对异常进行处理
# try:
#     try:
#         target = value  # 如果使用了 as 子句
#         with-body     # 执行 with-body
#     except:
#         # 执行过程中有异常发生
#         exc = False
#         # 如果 __exit__ 返回 True，则异常被忽略；如果返回 False，则重新抛出异常
#         # 由外层代码对异常进行处理
#         if not exit(context_manager, *sys.exc_info()):
#             raise
# finally:
#     # 正常退出，或者通过 statement-body 中的 break/continue/return 语句退出
#     # 或者忽略异常退出
#     if exc:
#         exit(context_manager, None, None, None) 
#     # 缺省返回 None，None 在布尔上下文中看做是 False


# 打开文件，并操作，若成功打开，不论操作时是否出错，都得将打开的文件关闭
try:
    f = open('file.txt')
    print(f.read())
finally:
    if f:
        f.close()

# 使用 with 语句操作文件对象，可以简化上述过程，当然与上面自己写的代码过程不等价，上面注释中的过程才是真正过程
with open('file.txt') as f:
    print(f.read());