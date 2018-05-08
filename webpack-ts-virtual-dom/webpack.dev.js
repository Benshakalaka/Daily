const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    devServer: {
    	// contentBase: path.join(__dirname, 'dist'),	//本地服务器所加载的页面所在的目录
		historyApiFallback: true,						//不跳转, SPA
		inline: true									//实时刷新
	},
	plugins: [
		new webpack.DefinePlugin({
    	  'process.env.NODE_ENV': JSON.stringify('development')
	    })
	]
});	