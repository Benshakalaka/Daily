var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: path.join(__dirname, 'app/app.ts'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".js"]
    },
	devServer: {
	    // contentBase: path.join(__dirname, 'dist'),//本地服务器所加载的页面所在的目录
	    historyApiFallback: true,//不跳转
	    inline: true//实时刷新
  	},
  	plugins: [
	  	new HtmlWebpackPlugin({
	  		title: 'test',
	  		template: 'index.html'
	  	}),
	  	new uglifyjsWebpackPlugin({
	  		sourceMap: true
	  	})
	],
  	module: {
  		rules: [{
  			test: /\.less$/,
	  		use: ['style-loader','css-loader', 'postcss-loader', 'less-loader']
	  	}, {
	  		test:/\.(png|jpg|gif)$/,
			use:[{
	    		loader:'url-loader',
	    		options:{
		        	limit:50000, 
	    	    	outputPath: path.join(__dirname, 'dist/assests/images')
	    		}
	    	}]
		}, {
			test: /\.ts$/,
			use: ['ts-loader']
		}]
  	}
}

