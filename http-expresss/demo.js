var http = require('http');
var fs = require('fs');
var port = 3000;
http.createServer(handleRequest).listen(port);
console.log("Started Server on port:", port);

function handleRequest(req,res){
	var url = req.url;
	url = url.toLowerCase();
	if(url==='/home'||url==='/home/'||url==='/'){
		serveStatic(res,'./public/index.html','text/html',200,req);
	} else if(url==='/about'||url==='/about/'){
		serveStatic(res,'./public/about.html','text/html',200,req);
	} else if(url==='/me'||url==='/me/'){
		serveStatic(res,'./public/about.html','text/html',301,req);
	} else if(url==='/img/image1.png'||url==='/img/image1.png/'){
		serveStatic(res,'./public/img/image1.png','image/png',200,req);
	} else if(url==='/img/image2.png'||url==='/img/image2.png/'){
    serveStatic(res,'./public/img/image2.png','image/png',200,req);
	} else if(url==='/css/base.css'||url==='/css/base.css/'){
		serveStatic(res,'./public/css/base.css','text/css',200,req);
	} else {
		serveStatic(res,'./public/404.html','text/html',404,req);
	}
}

function serveStatic(res,path,contentType,resCode,req){
	var url = req.url.toLowerCase();
	fs.readFile(path,function(err,data){
		if(err){
			res.writeHead(500,{'Content-Type':'text/plain'});
			res.end('500-Internal Error');
		}else{
			if(resCode===301){
				res.writeHead(resCode,{'Content-Type':contentType,'location':'/about'});
				res.end();
			}else{
				res.writeHead(resCode,{'Content-Type':contentType});
        res.end(data);
      }
      logging(req.method,url,res.statusCode);
    }
	});
}

function logging(method, url, status){
	var date = new Date();
	console.log(date.toLocaleString()+" "+date.toLocaleTimeString()+" "+method+" "+url+" "+status+" "+http.STATUS_CODES[status]);
}

