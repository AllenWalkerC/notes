var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: path.join(__dirname, './js/app/index.js'),
	output: {
		path: path.join(__dirname,'../public/javascripts'),
		filename: 'index.js'
	},
	resolve: {
		alias: {
			jquery: path.join(__dirname, './js/lib/jquery-3.2.0.min.js')
		}
	}
}