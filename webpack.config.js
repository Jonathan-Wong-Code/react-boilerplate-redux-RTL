const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV ==='test') {
	require('dotenv').config({ path :'.env.test'});
} else if (process.env.NODE_ENV ==='development') {
	require('dotenv').config({ path :'.env.development'});
}

module.exports = (env) =>{
	const isProduction = env ==='production';
	const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });
	return {
		entry : {
			index : ['@babel/polyfill','./src/js/index.js'],
		},
	
		output:{
			// path: path.join(__dirname, 'public', 'dist' ),
			path: path.join(__dirname, 'public'),
			filename:'bundle.js',
			publicPath: '/',
		},
		
		devServer: {
			contentBase: path.join(__dirname, './public'),
			historyApiFallback:true,
			publicPath:'/'
		},
	
		plugins:[
			new HtmlWebpackPlugin({
				template: './src/index.html'
			}),
			
			CSSExtract,
			new webpack.DefinePlugin({
				'process.env.FIREBASE_API_KEY':JSON.stringify(process.env.FIREBASE_API_KEY),
				'process.env.FIREBASE_AUTH_DOMAIN':JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
				'process.env.FIREBASE_DATABASE_URL':JSON.stringify(process.env.FIREBASE_DATABASE_URL),
				'process.env.FIREBASE_PROJECT_ID':JSON.stringify(process.env.FIREBASE_PROJECT_ID),
				'process.env.FIREBASE_STORAGE_BUCKET':JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
				'process.env.FIREBASE_MESSAGING_SENDER_ID':JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
			})
		],
	
		devtool:isProduction ? 'source-map' : 'inline-source-map',
		
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
				 	use:{
				 		loader:'babel-loader',
				 	}
				},{
					test:/\.s?css$/,
					use: [
					     MiniCssExtractPlugin.loader,
					     {
					         loader: 'css-loader',
					         options: {
					             sourceMap: true
					         }
					     },
					     {
					         loader: 'sass-loader',
					         options: {
					             sourceMap: true
					         }
					     }
					 ]
				}, {
          test : /\.(gif|png|jpe?g|svg)$/i,
          use : [
            'file-loader',
            {
              loader : 'image-webpack-loader',
              options : {
                bypassOnDebug : true, // webpack@1.x
                disable : true // webpack@2.x and newer
              }
            }
          ]
        }
			]//end rules
		} //end module
	};
};

