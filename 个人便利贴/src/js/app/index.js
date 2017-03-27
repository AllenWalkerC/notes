
var event = require('../mod/eventCenter.js');
var $ = require('jquery');
var load = require('../mod/load.js').load;
var go = new load();
event.on('drag',function(){
	var height = $(document).height();
	$('body').height(height);
});
