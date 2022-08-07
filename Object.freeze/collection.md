 const ReactElement = function(type, key, ref, self, source, owner, props)
 ## 在react创建元素的时候，对父传子的props进行Object.freeze进行浅属性冻结,使得子组件不能修改父组件的下透的props


 if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }

## react 通过拦截store数据,使得数据不能在传递的时候，修改传入的store里的值; 是经得起验证的

  Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false,
    });