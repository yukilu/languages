使用react-redux的connect连接react组件与redux的store时，tsx组件中若使用装饰器，在ts-lint中会报错

代码示例如下

```ts
import * as React from 'react';
import { connect } from 'react-redux';

interface PropsType { /*...*/ }
interface StateType { /*...*/ }

function mapStateToProps(state, props) { /*...*/ }
function mapDispatchToProps(dispatch, props) { /*...*/ }

@connect(mapStateToProps, mapDispatchToProps)
export default class MyComponent extends React.Component<PropsType, StateType> {
    //...
}
```

上述代码在ts-lint中会报错，说MyComponent类型不符，原因在于装饰器作用原理，上述代码翻译过来就是

```ts
MyComponent = connnect(...)(MyComponent)
```

要知道，在TypeScript中变量是有类型的，原来的MyComponent类型与connect后的组件是不相同的，所以要把connect后的组件再赋给原来的变量，那类型当然是不符合的，解决以上问题的办法，只能是不使用装饰器，不过在jsx中由于没有类型限制，可以用装饰器，因为这样更方便些。