var $ = require('jquery');
var event = require('./eventCenter.js');
var title = require('./title.js').prompt;
var WaterFull = require('./waterfull.js').WaterFull;
function Notes(id){
	this.msg = '';
	this.id = id;
	this.idArr = [];
	this.idArr.push(this.id);
	this.bind();
}
Notes.prototype = {
	createHtml: function(){
		var html = '<li class="notes-items">';
		    html += '<div class="note-header"></div>';
		    html += '<span class="iconfont-close close">&#xe614;</span>';
			html += '<textarea placeholder="请在这里输入内容"></textarea>';
			html +=	'</li>'
	    html = $(html);
	    this.id++;
	    html.attr('data-id',this.id)
	    $('.notes>ul').append(html);
	},
	removeHtml: function($ele,id){
		$.ajax({
        	url: '/api/remove',
        	method: 'post',
        	data: {
        		id: id,
        	}
        }).done(function(result){
            if(result.status === 0){
                $ele.remove();
                var remove = new title('删除成功');
                var w = new WaterFull();
            }else{
                var removeError = new title(result.errorMsg)
            }
        })
	},
	add: function(id,msg){
        $.ajax({
        	url: '/api/add',
        	method: 'post',
        	data: {
        		id: id,
        		msg: msg
        	}
        }).done(function(result){
            if(result.status === 0){
               var add = new title('添加成功');
               var w = new WaterFull();
               event.fire('drag');
            }else{
            	var addError = new title(result.errorMsg)
            }
        })
	},
	modify: function(id,msg){
		$.ajax({
        	url: '/api/modify',
        	method: 'post',
        	data: {
        		id: id,
        		msg: msg
        	}
        }).done(function(result){
            if(result.status === 0){
               var modify = new title('修改成功');
               var w = new WaterFull();
               event.fire('drag');
            }else{
            	var modifyError = new title(result.errorMsg)
            }
        })
	},
	setHeight: function(element) {
           $(element).css({
           	'height':'auto',
            'overflow-y':'hidden'}).height(element.scrollHeight);
    },
	bind: function(){
		var _this = this;
		$('.add').on('click',function(){
            _this.createHtml()
		});
		$(document).on('click','.close',function(){
			var id = parseInt($(this).parent('li').attr('data-id'));
            _this.removeHtml($(this).parent('li'),id);
		});
		$(document).on('mousedown','.note-header',function(e){
			if(e.which === 1){
				var eleOffsetX = $(this).parent('.notes-items').offset().left,
				    eleOffsetY = $(this).parent('.notes-items').offset().top,
				    mouseX = e.pageX;
				    mouseY = e.pageY;
				    that = $(this);
				$(document).on('mousemove',function(e){
					var poorX = e.pageX - mouseX,
					    poorY = e.pageY - mouseY,
					    nowX = poorX + eleOffsetX,
					    nowY = poorY + eleOffsetY;
	                    that.parent('.notes-items').css({
	                    	top: nowY,
	                    	left: nowX
	                    });
	                    event.fire('drag')
				});
			}
		});
		$(document).on('mouseup',function(){
			$(this).off('mousemove');
		});
		$(document).on('focus','.notes-items>textarea',function(){
			$(this).data('old',$(this).text());
		});
		$(document).find('textarea').each(function () {
			_this.setHeight(this);
		}).on('input', function () {
			_this.setHeight(this);
			event.fire('drag');
		});
        $(document).on('blur','.notes-items>textarea',function(){
			if($(this).data('old') !== $(this).val()){
				var id = parseInt($(this).parent('li').attr('data-id'));
                $(this).data('old',$(this).val());
                if(_this.idArr.indexOf(id) !== -1){
                   _this.modify(id,$(this).val())
                }else{
                	_this.idArr.push(id);
                	_this.add(id,$(this).val())
                }
			}
		});
	}
}
module.exports.Notes = Notes;