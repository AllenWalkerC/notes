var $ = require('jquery');

function Prompt(msg,time){
	this.msg = msg;
	this.time = time || 1000;
	this.create();
	this.render();
}
Prompt.prototype = {
	create: function(){
		this.html = $('<div class="title">' + this.msg + '</div>');
		$('body').append(this.html);
	},
    render: function(){
	    var _this = this;
	    this.html.fadeIn(_this.time, function(){
		    setTimeout(function(){
			        _this.html.fadeOut(_this.time,function(){
			        _this.html.remove();
			        })
		    },1000)
	    })
	}
}
module.exports.prompt = Prompt;