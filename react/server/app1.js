// src/app1.js
const express = require("express");
const path = require("path");
const app = express();

app.all("*", (req, res, next) => {
  res.setHeader('set-cookie', ['id=1;expires=' + new Date(Date.now() + 1000 * 10).toUTCString()]);
  // 表示id=1这个cookies在5秒之后失效。
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // 设置了那些请求域名才能bu被同源策略驳回响应
  res.header("Access-Control-Allow-Credentials", "true"); // ++ 新增
  next();
});
 
// `index.html` 加载时会请求login接口
// 设置`cookie`
app.get("/login", (req, res) => {
  res.cookie("user", "jay", { maxAge: 2000000, httpOnly: true });
  console.log(req.headers,'xiangying')
  console.log(req.capture,'xiangying')
  console.log(req.headers.cookie,'xiangying')
  res.json({ code: 0, message: "登录成功" });
});
 
// 此接口是检测`cookie`是否设置成功，如果设置成功的话，浏览器会自动携带上`cookie`
app.get("/user", (req, res) => {
  // req.headers.cookie: user=jay
  // const user = req.headers.cookie.split("=")[1];
  // res.json({ code: 0, user });
  console.log(req,'user');
  res.json("hello-world");
});
 
// 托管`index.html`页面
// 这样的话在`index.html`中发起的请求，默认的源就是`http://localhost:8000`
// 然后再去请求`http://localhost:8003`就会出现跨域了
// 配置静态资源目录
// app.use(express.static(path.resolve(__dirname,'public')));
app.use('/static',express.static(path.join(__dirname,'public')));
app.get('/', function (req, res) {
   res.sendFile(path.resolve("./public/login.html"));
});// 显示html页面
 
var server = app.listen("8000", () => {
  var host = server.address().address;
  var port = server.address().port;
 //  服务器IP地址为127.0.0.1 端口为8888
  console.log( "server is running"+ host  + "hello" +port);
});