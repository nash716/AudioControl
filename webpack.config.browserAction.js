var webpack = require('webpack');

module.exports = {
	entry: './src/browser_action/js/popup.js',
	output: {
		path: './dist/browser_action/js',
		filename: 'popup.js'
	},
	stats: {
		colors: true
	},
	resolve: {
		extensions: [ '', '.js', '.jsx', '.json' ]
	},
	module: {
		preLoaders: [
			/*{
			 test: /\.jsx?$/,
			 loader: 'eslint-loader'
			}*/
		],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					optional: [ 'runtime' ],
					stage: 0
				}
			}
		]
	}
};
