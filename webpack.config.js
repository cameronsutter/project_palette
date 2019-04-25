var fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prodMode = process.env.NODE_ENV === 'production';

const root = __dirname;
const distPath = path.resolve(root, 'dist');

const config = {
	entry: './src/index.js',
	output: {
		path: distPath,
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /\.test\./,
        include: path.resolve(root, 'src'),
			},
			{
	      test: /\.less$/,
	      use: [
					'style-loader',
	      	'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							// Necessary for external CSS imports to work
							// https://github.com/facebookincubator/create-react-app/issues/2677
							ident: 'postcss',
							plugins: () => [
								require('postcss-flexbugs-fixes'),
								require('autoprefixer')({
									browsers: [
										'>1%',
										'last 4 versions',
										'Firefox ESR',
										'not ie < 9', // React doesn't support IE8 anyway
									],
									flexbox: 'no-2009',
								}),
							],
						},
					},
					'less-loader'
				]
	    }
		],
	},
	plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
		new CleanWebpackPlugin([distPath])
	],
	devServer: {
		host: '0.0.0.0',
		disableHostCheck: true,
		port: 5151,
		contentBase: './public',
    hot: true,
		open: true,
	},
	devtool: 'inline-source-map',
};

module.exports = config;
