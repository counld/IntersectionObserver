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

# 图片裁切利用css的clip获取裁切的图片，

该功能有一个bug --拖动的时候不能准确的裁到合适的位置;
#修复了bug, 这是因为没有阻止图片默认事件，导致的鼠标移动，裁剪 不准确;
