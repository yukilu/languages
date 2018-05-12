# 关于定位层级z-index的说明

## 父层级z-index为auto时，默认都在一个层面上
所以如下html中，按理来说f2层级比f1高，所以即使s1的z-index大于s2的z-index，也不应该出现s1覆盖s2，但实际上却是这样的，所以可以推断出当父层级z-index为auto时，大家处于同一层级中，这个情况比较特殊

```html
<div id="container">
    <div id="f1">
        <div id="s1"></div>
    </div>
    <div id="f2">
        <div id="s2"></div>
    </div>
</div>
```

```css
* { padding: 0; margin: 0; }
#container { position: relative }
#f1 { position: absolute; width: 1000px; height: 500px; background: pink; left: 0; top: 0; }
#s1 { position: absolute; width: 100px; height: 100px; background: #F00; left: 0; top: 0; z-index: 2; }
#f2 { position: absolute; width: 800px; height: 300px; background: orange; left: 0; top: 0; }
#s2 { position: absolute; width: 50px; height: 50px; background: #00F; left: 0; top: 0; z-index: 1; }
```

## 父层级z-index设置为相同值时，后面元素的层级要高于前面的
html结构同上，可以看到给f1和f2设置了相同的层级，都为0(或其他任意数)，但是虽然s1的层级要高于s2，结果却是s2覆盖了s1，这与层级为auto时不同，所以其实也可以说明 z-index: auto并不等价于 z-index: 0
这里本质上是后面的f2覆盖了前面的f1，不论f下面的子元素z-index为多少，其值都是相对于父元素的层级来说的，即子元素在页面上显示的层级都是基于父元素的层级的

```css
* { padding: 0; margin: 0; }
#container { position: relative }
#f1 { position: absolute; width: 1000px; height: 500px; background: pink; left: 0; top: 0; z-index: 0; }
#s1 { position: absolute; width: 100px; height: 100px; background: #F00; left: 0; top: 0; z-index: 2; }
#f2 { position: absolute; width: 800px; height: 300px; background: orange; left: 0; top: 0; z-index: 0; }
#s2 { position: absolute; width: 50px; height: 50px; background: #00F; left: 0; top: 0; z-index: 1; }
```

## 父层级z-index不同时，大的覆盖小的
这个没啥好说的