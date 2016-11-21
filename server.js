require('babel-register')
const SERVER_PORT_NUMBER = 8080
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.js')
const compiler = webpack(config)
const server = new webpackDevServer(compiler,{
    contentBase: './dist',
    hot: true
});
server.listen(SERVER_PORT_NUMBER, function(){
  console.log('server is listening in on ' + SERVER_PORT_NUMBER)
});