var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var List = mongoose.model('List');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res){
	List.find(function(err,lists,count){
		res.render('list',{
			lists:lists
		});
	});
});

router.get('/list/create', function(req, res){
	res.render('create');
});

router.post('/list/create', function(req, res){
	new List({
		name: req.body.name,
		createdBy: req.body.createdBy
	}).save(function(err,list,count){
		res.redirect('/list/'+list.slug);
	});
});

router.get('/list/:slug', function(req, res){
	console.log(req.params.slug);
	List.findOne({slug: req.params.slug}, function(err, list, count){
		res.render('items', { name: list.name, slug: list.slug, items: list.items });
	});
});

router.post('/item/create', function(req, res){
	List.findOneAndUpdate({slug: req.body.slug}, {$push: {items: {name: req.body.name, quantity: req.body.quantity, checked: false}}}, function(err, list, count) {
		res.redirect("/list/"+list.slug);
		});
});

router.post('/item/check', function(req, res){
	List.findOne({slug: req.body.slug}, function(err, list, count){
		if(req.body.checkbox===undefined){
			res.redirect('/list/'+req.body.slug);
		}else{
			for(var i=0;i<list.items.length;i++){
				if(req.body.checkbox.indexOf(list.items[i].name)>-1){
					list.items[i].checked=true;
				}
			}
			list.markModified('items');
			list.save(function(saveErr, saveList, saveCount){
				res.redirect('/list/'+req.body.slug);
			});
		}
	});
});

module.exports = router;
