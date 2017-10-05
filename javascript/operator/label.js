// 带标签的break和continue
// 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label

// 通过执行带标签的break跳转到带标签的语句块末尾
// 如下两层循环时，若在内层循环break时，只会跳出内层循环，外层循环还会继续，有时候我们希望跳出外层循环，就需要用带标签的break
for (let i = 0; i < 5; i++)
    for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2)
            break;
        console.log('i = %d j = %d', i, j);
    }

// 跳出内层循环，效果同上
outerLoop:
for (let i = 0; i < 5; i++)
    innerLoop:
    for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2)
            break innerLoop;
        console.log('i = %d j = %d', i, j);
    }

// 跳出外层循环
outerLoop:
for (let i = 0; i < 5; i++)
    innerLoop:
    for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2)
            break outerLoop;
        console.log('i = %d j = %d', i, j);
    }

// 带label的continue同break用法相同
// 通过执行带标签的continue跳转到带标签的语句块首部
for (let i = 0; i < 5; i++)
    for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2)
            continue;  // 同continue innerLoop;
        console.log('i = %d j = %d', i, j);
    }

outerLoop:
for (let i = 0; i < 5; i++)
    innerLoop:
    for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2)
            continue innerLoop;
        console.log('i = %d j = %d', i, j);
    }

outerLoop:
for (let i = 0; i < 5; i++)
    innerLoop:
    for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2)
            continue outerLoop;
        console.log('i = %d j = %d', i, j);
    }