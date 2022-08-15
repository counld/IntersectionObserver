## 使用react开发移动端过程中的的记录事项
	使用自定义的webpack配置方案,这样扩展了一大部分的功能, 开启以下
	使用了hot热更新, proxy代理方案,registerServiceWorker,less-loader

## 针对移动端适配进行了封装，使用了pr2rem进行开发中px转rem
(function(psdw){
  var dpr=0 , rem=0 , scale=0;
  var htmlDOM=document.documentElement;
  dpr=window.devicePixelRatio;
  var currentWidth=htmlDOM.clientWidth;
  scale=currentWidth/psdw;
  rem=psdw/10;
  rem=rem*scale;
  htmlDOM.style.fontSize=rem+'px';
  htmlDOM.setAttribute('data-dpr',dpr)
})(750)

并在webpack中配置module的rule，使用loader: require.resolve('postcss-loader')加载 px2rem({remUnit: 75})插件,使得页面能进行转换

## react-addons-css-transition-group包可以进行滑动加载组件

## react-grid-layout 可以制作动态拖拽，改变位置
自定义配置参数，进行自定义

## 自作pdf网页
https://github.com/wojtekmaj/react-pdf