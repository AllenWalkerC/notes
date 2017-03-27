var $ = require('jquery');

function WaterFull(){
	this.render()
	this.bind()
}
WaterFull.prototype = {
	render: function(){
		var li = $('.notes li'),
            minValue,
            minIndex,
		    arr = [],
		    cols = parseInt($('.notes').outerWidth()/$('.notes li').outerWidth(true));
		for(var i = 0;i<cols;i++){
			arr[i] = 110
		}
		$.each(li,function(index,value){
            minValue = Math.min.apply(null,arr);
            minIndex = arr.indexOf(minValue)
            $(value).css({
            	top: minValue,
            	left: $(value).outerWidth(true)*minIndex
            })
            arr[minIndex] = minValue+$(value).outerHeight(true)
		})
	},
	bind: function(){
		var that = this
		$(window).on('resize',function(){
			that.render()
		})
	}
}
module.exports.WaterFull = WaterFull;