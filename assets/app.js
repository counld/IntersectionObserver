var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');


//实现  静态服务器功能
//让static变成静态文件   
//可以直接127.0.0.1/1.html  返回 static/1.html

var server = http.createServer(function (req, res) {
    if(req.url == '/favicon.ico'){
        return
    }

    var pathname = url.parse(req.url).pathname;

    var extname = path.extname(pathname);
    if (pathname == '/') {
        pathname = 'index.html'
    }

    fs.readFile('./static/' + pathname, (err, data) => {
        if (err) {
            fs.readFile('./static/404.html', (err, data) => {

                // Mime类型
                //html   :text/html
                //jpg ：image/jpg
                //js :application/x-javascript
                res.writeHead(404, { 'Content-type': 'text/html;charset=UTF8' })
                res.end(data)
            })
            return
        }
        var Mime = getMime(extname);
        res.writeHead(200,{'Content-type':Mime})
        res.end(data)
    })
}).listen('3000', '127.0.0.1')

//根据文件尾 返回mime类型
function getMime(extname) {
     var data =  fs.readFileSync('./mime.json');
     var mimeJson = JSON.parse(data.toString());
    if( mimeJson[extname]){
        console.log('mime', mimeJson[extname])
        return mimeJson[extname]
    }else{
        return 'text/html';
    }
}
