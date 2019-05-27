const production = String(process.env.NODE_ENV) === 'production';
const test = String(process.env.NODE_ENV) === 'test';


module.exports = {
presets : [
	["@babel/preset-env", {modules: test ? 'commonjs' : false}],
	"@babel/preset-react"
],
plugins :[
	"@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-proposal-class-properties",
  ],

  env: {
    production: {
      plugins: [
        ["react-remove-properties", { properties : ["data-test"]}]
      ]
    },
    test : {
      plugins: [
       ['babel-plugin-dynamic-import-node']
      ]
    }
  }
}