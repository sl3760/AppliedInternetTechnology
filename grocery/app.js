var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var session = require('express-session');
var path = require('path');

var app = express();
var port = 3000;

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

var publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var sessionOptions = {
	secret: 'secret cookie thang',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));

app.listen(port, function(){
	console.log("Started server on port: "+port);
});

var birds = [];

function addBird(birdName, birdWatched){
	this.birdName = birdName;
	this.birdWatched = birdWatched;
}

birds.push(new addBird("Bald Eagle", 3));
birds.push(new addBird("Yellow Billed Duck", 7));
birds.push(new addBird("Great Cormorant", 4));

function logging(req){
	console.log(req.method, req.path);
	console.log("=======");
	console.log("req.body", req.body);
	console.log("req.session.minValue: ", req.session.minValue);
  console.log("\n");
}

app.get('/', function(req,res){
	logging(req);
	res.render('home');
});

app.get('/birds', function(req,res){
	logging(req);
	if((typeof req.session.minValue)!='undefined'){
		var filterd = [];
		for(var i=0;i<birds.length;i++){
			if(birds[i].birdWatched>=req.session.minValue){
				filterd.push(birds[i]);
			}
		}
		res.render('list',{'birds': filterd});
	}else{
		res.render('list',{'birds': birds});
	}
});

app.get('/settings', function(req,res){
	logging(req);
	if((typeof req.session.minValue)!='undefined'){
		res.render('settings',{minValue:req.session.minValue});
	}else{
		res.render('settings',{minValue:0});
	}
});

app.post('/birds', function(req,res){
	logging(req);
	var exists = 0;
	for(var i=0;i<birds.length;i++){
		if(birds[i].birdName==req.body.name){
			birds[i].birdWatched+=1;
			exists=1;
		}
	}
	if(exists===0){
		birds.push(new addBird(req.body.name,1));
	}
	res.redirect('/birds');
});

app.post('/settings', function(req,res){
	logging(req);
	req.session.minValue=req.body.minValue;
	res.redirect('/birds');
});



