使用react-redux的connect连接react组件与redux的store时，tsx组件中若使用装饰器，在ts-lint中会报错

代码示例如下

```ts
// MyComponent.tsx
import * as React from 'react';
import { connect } from 'react-redux';

interface PropsType { /*...*/ }

function mapStateToProps(state, props) { /*...*/ }
function mapDispatchToProps(dispatch, props) { /*...*/ }

@connect(mapStateToProps, mapDispatchToProps)
export default class MyComponent extends React.Component<PropsType, {}> {
    //...
}
```

在其他模块中导入

```ts
// AnotherComponent.tsx
import MyComponent from './MyComponent';

interface AnotherComponentProps { /*...*/ }

export function AnotherComponent(props: AnotherComponentProps) {
    return <MyComponent />;
}
```

```ts
// 装饰器作用等同于如下代码
MyComponent = connnect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

在AnotherComponent中，上述代码在ts-lint中会报错，说MyComponent类型不符，原因在于在AnotherComponent.tsx中导入的MyComponent，ts-lint认为其类型是MyComponet.tsx中定义的class MyComponent extends React.Component<PropsType, StateType>，而实际上由于装饰器的作用，在AnotherComponent.tsx中导入MyComponent是connect函数处理过的组件，并不是ts-lint认为的原来的组件，这可以认为是ts-lint的一个bug，即未对装饰器作用后的变量类型进行改变，而只认为其是原来的类型

解决上述问题的办法有两种：
1.不使用装饰器

```ts
Connected = connect(mapStateToProps, mapDispatchToProps)(Component)
```

2.改变PropsType，对通过mapStateToProps及mapDispatchToProps函数map进组件的属性，由于connect后不需要再传入这些属性，所以将其设为可选

```ts
interface PropsType {
    // required props
    mapProp?: string;
}
```
