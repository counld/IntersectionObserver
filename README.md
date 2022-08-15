# IntersectionObserver这是可以监听某个元素的api的类

var observer = new IntersectionObserver(callback,options);
callback是当被监听元素的可见性变化时，触发的回调函数

options是一个配置参数，可选，有默认的属性值

Watch for intersection events on a specific target Element.
对元素target添加监听，当target元素变化时，就会触发上述的回调
observer.observe(target);
// Stop watching for intersection events on a specific target Element.
移除一个监听，移除之后，target元素的可视区域变化，将不再触发前面的回调函数
observer.unobserve(target);
// Stop observing threshold events on all target elements.
 停止所有的监听
observer.disconnect();

可以查看文档链接 --- https://www.jianshu.com/p/7c06669ed98e

# 图片裁切利用css的clip获取裁切的图片，--clip-picture

该功能有一个bug --拖动的时候不能准确的裁到合适的位置;


# 新增clip-picture -> layout-side案例，左侧侧边栏动态拉伸实现
该功能可以实现刷新页面样式持久

# 饮水案例drink-water
能够根据你给的水量,动态生成对应的水杯样子

# insect-catch-game 生成随机的点击的游戏, 记入所得的分数

# 点击模拟手机的按钮生成不同的背景图片mobile-tab-navigation


# 模拟记事本的形态 notes-app
可以写入自己的一些事情,这样就好像可以制作在线写作的工具

# 在react创建元素的时候，对父传子的props进行Object.freeze进行浅属性冻结
根据react的默认属性的冻结，使得子组件不能修改父组件的下透的props， 还有proxy代理的实现,拦截数据的改变


## mock-service-plugin 使用vue创建mock服务接口,这样就可以mock一个接口数据
---这也可以用express搭建一个app服务路由，请求那个路由返回那个数据,更可以根据参数，获取不同的数据;






