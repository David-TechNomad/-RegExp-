const http = require("http");
// 创建一个监听（服务端）的程序
http.createServer(function(request, response) {
    if(request.url === '/') {
        var target = "http://tuijian.hao123.com/hotrank";
        http.get(target, function(res) {
            var html = '';
            res.on("data", function(text) {
                html += text;
            })
            res.on("end", function() {
                response.writeHead(200, {'Content-Type':'text/html'});
                response.write("<meta charset=\"utf-8\">");
                html = filter(html);
                response.write(html);
                response.end();
            })
        })
    } else {
        response.end();
    }
    
}).listen(8090);

// 用正则过滤数据
function filter(html) {
    //<span class="point-title"><a href="1" target="_blank" class="point-title-link">1</a></span>
    var regExp = new RegExp("<span class=\"point-title\"><a href=\"(.+?)\" target=\"_blank\" class=\"point-title-link\">(.+?)</a></span>", "igm");
    var arr,json = [],str = "";
    while(arr = regExp.exec(html)){
        // console.log(arr[0]);//全部匹配的标签
        // console.log(arr[1]+"========"+arr[2]);//匹配的数据
        // json.push({href:arr[1],text:arr[2]});//缓存匹配的数据
        str +="<a class=\"link\" style=\"font-size:18px;\" href=\""+arr[1]+"\">"+arr[2]+"</a><br/>"

    }
    //servicr.save(json);
    return str;
}