const path = require("path")
const glob = require("glob")

module.exports = {
    "mode": "development",

    "entry": {
		"script": "./public/prescripts/script.ts"
    },

    module: {
        rules: [
          	{
            	test: /\.ts?$/,
            	use: 'ts-loader',
            	exclude: /node_modules/,
        	},
        ],
    },
    resolve: {
    	extensions: ['.ts', '.js'],
    },
    "output": {
        filename: "[name].js",
        "path": path.join(__dirname, "public/scripts")
    }
}