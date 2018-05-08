const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
var uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
	plugins: [
		new uglifyjsWebpackPlugin(),
		new webpack.DefinePlugin({
    	  'process.env.NODE_ENV': JSON.stringify('production')
	    })
	]
});