var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'app/app.ts'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".js"]
    },
  	plugins: [
	  	new HtmlWebpackPlugin({
	  		title: 'Webpack Try',
	  		template: 'index.html'
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

