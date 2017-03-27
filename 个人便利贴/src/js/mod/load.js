var $ = require('jquery');
var title = require('./title.js').prompt;
var notes = require('./notes.js').Notes;
var WaterFull = require('./waterfull.js').WaterFull;
var event = require('./eventCenter.js');
function Load(){
	this.id = 0;
	this.bind();
}
Load.prototype = {
	getNotes: function(){
		var _this = this;
		$.ajax({
			url: '/api/allnotes',
		}).done(function(result){
			if(result.status === 0){
				_this.render(result,_this.start)
			}else{
                var error = new title(result.errorMsg)
			}
		})
	},
	render: function(result,fn){
		for(var i = 0;i<result.data.length;i++){
			var html = '<li class="notes-items">';
			    html += '<div class="note-header"></div>';
			    html += '<span class="iconfont-close close">&#xe614;</span>'
				html += '<textarea placeholder="请在这里输入内容">'+result.data[i].text+'</textarea>';
				html +=	'</li>'
	        html = $(html);
	        html.attr('data-id',result.data[i].id);
	        $('.notes>ul').append(html);
	        this.id = result.data[i].id;
		}
		fn(this.id);
	},
    start: function(num){
    	var n = new notes(num);
    	var W = new WaterFull();
    	event.fire('drag');
    },
    bind: function(){
    	var _this = this;
    	$(document).ready(function(){
           _this.getNotes();
    	})
    }
}
module.exports.load = Load;