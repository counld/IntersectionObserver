// Proxy就像一个代理器,当有人对目标对象进行处理(set、has、get等等操作)的时候它会拦截操作，并用我们提供的代码进行处理，此时Proxy相当于一个中介或者叫代理人,当然Proxy的名字也说明了这一点,它经常被用于代理模式中,例如字段验证、缓存代理、访问控制等等。

// const target = { name: 'Messi', age: 29 };
// const handler = {
// 	get: function (target, key, receiver) {
// 		console.log(`getting ${key}!`);
// 		if (key === 'age') {
// 			const age = Reflect.get(target, key, receiver)
// 			Reflect.set(target, key, age + 1, receiver);
// 			return age + 1
// 		}
// 		return Reflect.get(target, key, receiver);
// 	}
// };
// const a = new Proxy(target, handler);
// console.log(a.age, a.age);
// getting age!
// getting age!
// 30 31

// 在外部对目标对象进行修改的时候,我们可以将被修改的引用的那部分进行拷贝,这样既能保证效率又能保证可靠性.

// 那么如何判断目标对象是否被修改过,最好的方法是维护一个状态
function createState(target) {
	this.modified = false; // 是否被修改
	this.target = target; // 目标对象
	this.copy = undefined; // 拷贝的对象
}

createState.prototype = {
	// 对于get操作,如果目标对象没有被修改直接返回原对象,否则返回拷贝对象
	get: function (key) {
		if (!this.modified) return this.target[key];
		return this.copy[key];
	},
	// 对于set操作,如果目标对象没被修改那么进行修改操作,否则修改拷贝对象
	set: function (key, value) {
		if (!this.modified) this.markChanged();
		return (this.copy[key] = value);
	},
	// 标记状态为已修改,并拷贝
	markChanged: function () {
		if (!this.modified) {
			this.modified = true;
			this.copy = shallowCopy(this.target);
		}
	},
}

// 拷贝函数
function shallowCopy(value) {
	if (Array.isArray(value)) return value.slice();
	if (value.__proto__ === undefined) {//这个value值是由null创建的《所以会等于undefined;
		return Object.assign(Object.create(null), value);
	}
	return Object.assign({}, value);
}

// then coke.__proto__ === undefined. Why is it undefined in the second case?
var drink = Object.create(null);
Object.defineProperty(drink, 'taste', {value:"nice"});
var coke = Object.create(drink);
console.log(coke.taste); //"nice"
console.log(coke.__proto__); //undefined
console.log(Object.getPrototypeOf(coke)); //Object {taste: "nice"}

// 最后我们就可以利用构造函数createState接受目标对象state生成对象store,然后我们就可以用Proxy代理store,producer是外部传进来的操作函数,当producer对代理对象进行操作的时候我们就可以通过事先设定好的handler进行代理操作了.

const PROXY_STATE = Symbol('proxy-state');

const handlers = {
	get(target, key) {
		if (key === PROXY_STATE) return target;
		return target.get(key);
	},
	set(target, key, value) {
		return target.set(key, value);
	},
}

// 接受一个目标对象和一个操作目标对象的函数
function produce(state, producer) {
	const store = new createState(state);
	const proxy = new Proxy(store, handlers);
	producer(proxy);
	const newState = proxy[PROXY_STATE];
	if (newState.modified) return newState.copy;
	return newState.target;
}

// 我们可以验证一下,我们看到producer并没有干扰到之前的目标函数.

const baseState = [
	{
		todo: 'Learn typescript',
		done: true,
	},
	{
		todo: 'Try immer',
		done: false,
	}
]

const nextState = produce(baseState, draftState => {
	draftState.push({ todo: 'Tweet about it', done: false });
	draftState[1].done = true;
});

console.log(baseState, nextState);
/*
[ { todo: ‘Learn typescript’, done: true },
{ todo: ‘Try immer’, done: true } ]

[ { todo: ‘Learn typescript’, done: true ,
{ todo: ‘Try immer’, done: true },
{ todo: ‘Tweet about it’, done: false } ]
*/