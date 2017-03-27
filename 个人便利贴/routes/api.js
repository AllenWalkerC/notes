var express = require('express');
var router = express.Router();
var Note = require('../module/note.js').Note;

router.get('/allnotes', function(req, res, next) {
	Note.findAll({raw: true}).then(function(data){
		console.log(data)
		res.send({status: 0, data: data});
	})
});

router.post('/add', function(req, res, next) {
	var text = req.body.msg; 
    Note.create({text: text}).then(function(){
    	res.send({status: 0})
    }).catch(function(){
    	res.send({status: 1, errorMsg: '出错了'})
    })
});

router.post('/modify', function(req, res, next) {
    var text = req.body.msg;
    var id = req.body.id;   
    Note.update({text: text},{where:{id:id}}).then(function(){
    	res.send({status: 0})
    }).catch(function(){
    	res.send({status: 1, errorMsg: '出错了'})
    })
});

router.post('/remove', function(req, res, next) {
    var id = req.body.id;
    Note.destroy({where:{id:id}}).then(function(){
    	res.send({status: 0})
    }).catch(function(){
    	res.send({status: 1, errorMsg: '出错了'})
    })
});
module.exports = router;
