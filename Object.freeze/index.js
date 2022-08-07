// 应用场景
// Object.freeze()可以提高性能，如果你有一个对象，里面的内容特别特别多，而且都是一些静态数据，你确保不会修改它们，那你其实可以用Object.freeze()冻结起来，这样可以让性能大幅度提升，提升的效果随着数据量的递增而递增。一般什么时候用呢？对于纯展示的大数据，都可以使用Object.freeze提升性能。
var obj = {
	name: '张三',
	info: {
			a: 1,
			b: 2
	}
}
function deepFreeze(obj) {
	// 获取所有属性
	var propNames = Object.getOwnPropertyNames(obj)

	// 遍历
	propNames.forEach(item => {
			var prop = obj[item]
			// 如果某个属性的属性值是对象，则递归调用
			if (prop instanceof Object && prop !== null) {
					deepFreeze(prop)
			}
	})
	// 冻结自身
	return Object.freeze(obj)
}
deepFreeze(obj)
obj.name = '李四'
console.log(obj)    // {name: "张三", info: {…}}
obj.info.a = 100
console.log(obj.info)   // {a: 1, b: 2}

// Object.freeze()原理
// 模拟Object.freeze()原理主要用到两个关键方法，Object.definedProperty()、Object.seal()。

// Object.definedProperty()方法可以定义对象的属性的特性。如可不可以删除、可不可以修改等等
Object.defineProperty(person, 'name', {
	configurable: false,// 表示能否通过delete删除属性，能否修改属性的特性...
	enumerable: false,// 表示是否可以枚举。直接在对象上定义的属性，基本默认true
	writable: false,// 表示能否修改属性的值。直接在对象上定义的属性，基本默认true
	value: 'xm'// 表示属性的值。访问属性时从这里读取，修改属性时，也保存在这里。
})

// 通过上述配置，就能实现不能修改已有属性的值、不能修改已有属性的可枚举性、可配置性、可写性等等功能了

// Object.seal()方法可以让对象不能被扩展、删除属性等等。用法：Object.seal(person)

// 通过Object.seal()方法可以实现不能删除，不能新增对象属性等等功能。通过这两个方法就可以实现一个简单的freeze方法了


function myFreeze(obj) {
	if (obj instanceof Object) {
			Object.seal(obj);
			let p;
			for (p in obj) {
					if (obj.hasOwnProperty(p)) {
							Object.defineProperty(obj, p, {
									writable: false
							});
							myFreeze(obj[p]);
					}
			}
	}
}

//https://blog.csdn.net/cai_niao5623/article/details/121095017