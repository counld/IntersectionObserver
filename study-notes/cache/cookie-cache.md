### 客户端请求服务器时怎么携带cookie验证的
Set-Cookie 响应头字段（Response header）是服务器发送到浏览器或者其他客户端的一些信息，一般用于登陆成功的情况下返回给客户端的凭证信息，然后下次请求时会带上这个 cookie，这样服务器端就能知道是来自哪个用户的请求了。

Cookie 请求头字段是客户端发送请求到服务器端时发送的信息（满足一定条件下浏览器自动完成，无需前端代码辅助）

### 客户端要自动携带cookie的条件
 +++ 也就是说相同域名下不同端口的cookie本地存储都能在这个域名名下访问，
 cookie可以共享在同域不同端口共享 localStorage和sessionStorage不可以共享
如果满足下面几个条件：

浏览器端某个 Cookie 的 domain（.a.com） 字段等于请求的域名或者是请求的父域名，请求的域名需要是 a.com/b.a.com 才可以
都是 http 或者 https，或者不同的情况下 Secure 属性为 false（即 secure 是 true 的情况下，只有 https 请求才能携带这个 cookie）
要发送请求的路径，跟浏览器端 Cookie 的 path 属性必须一致，或者是浏览器端 Cookie 的 path 的子目录，比如浏览器端 Cookie 的 path 为 /test，那么请求的路径必须为/test 或者 </test/xxxx 等子目录才可以>
上面 3 个条件必须同时满足，否则该请求就不能自动带上浏览器端已存在的 Cookie

第一次请求网页内容时没有任何cookie，服务器在收到请求以后会在HTTP响应里添加添加头部Set-Cookie,并且在Set-Cookie里进行标识，在下一次请求的时候浏览器就会在HTTP请求里添加头部Cookie，并且用上Set-Cookie里的标识，这样服务器就可以给不同用户匹配不同的内容，自打服务器给了Set-Cookie以后，以后每一次HTTP请求都要把Cookie数据传送给服务器
+++???？  也就是说在本地开发中，请求的本地资源都会带上cookie验证; 可为什么请求本地静态资源还要带上cookie呢

### 客户端要自己手动的设置携带cookie的条件
ajax，axios请求无论是否跨域，默认请求头中都是不会自动带上cookie信息的。

如果需要ajax请求自动在请求头中带上cookie信息，需要所访问的服务器允许这样的操作。

服务器的设置为：在响应头中添加Access-Control-Allow-Credentials头信息，该字段设置为true字符串。

浏览器发送预检请求获取到响应头中有这个字段，则认为服务器允许在发送ajax请求时自动带上cookie信息。

服务器允许这样的操作后，那么前端发送ajax请求的时候，就需要进行这样的操作。

jquery的ajax请求中设置withCredentials=true即可。

###  重点： 接下来开始解决跨域携带cookie问题：

1. 在前端请求的时候设置request对象的属性withCredentials为true;
什么是withCredentials？

XMLHttpRequest.withCredentials 属性是一个Boolean类型，它指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制(cross-site Access-Control)请求。在同一个站点下使用withCredentials属性是无效的。

如果在发送来自其他域的XMLHttpRequest请求之前，未设置withCredentials 为true，那么就不能为它自己的域设置cookie值。而通过设置withCredentials 为true获得的第三方cookies，将会依旧享受同源策略，因此不能被通过document.cookie或者从头部相应请求的脚本等访问。
```javascript
前端也可以设置
// 修改跨域请求的代码 withCredentials: true
    axios({
      withCredentials: true, // ++ 新增
      method: "get",
      url: "http://localhost:8003/anotherService",
    }).then((res) => {
      console.log(res);
    });

		-----------------------------------------------------------------------------

后端要增加如下代码，前端的 withCredentials: true 才能起作用
// 在所有路由前增加，可以拦截所有请求
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000"); // 设置了那些请求域名才能bu被同源策略驳回响应
  res.header("Access-Control-Allow-Credentials", "true"); // ++ 新增
  next();
});

只有前端请求这个接口设置了 withCredentials: true才能接受后端传过来的set-cookie的信息;不然后端就是传了这样的设置cookie头信息，浏览器也不会设置并保存cookie的内容

```
总结：
前端请求时在request对象中配置"withCredentials": true；
服务端在response的header中配置"Access-Control-Allow-Origin", "http://xxx:${port}";
服务端在response的header中配置"Access-Control-Allow-Credentials", "true"

               --------
							
```
https://blog.csdn.net/china_coding/article/details/125827492
