const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname,'build')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(9000,function(res,) {
	console.log('服务器监听在9000',path.resolve(__dirname, 'build', 'index.html'));
});