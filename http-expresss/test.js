var express = require('express');
var app = express();
var port = 3000;

var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.get('/',function(req,res){
	res.render('index',{header: req.headers});
});

app.get('/about',function(req,res){
	res.render('about');
});

app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
});

app.listen(port, function(){
  console.log('Express started on port:' + port);
});