require('babel-register')
const SERVER_PORT_NUMBER = process.env.PORT || 8080
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.js')
const compiler = webpack(config)
const express = require('express')
var server;
if (process.env.NODE_ENV === undefined) {
  server = express()
  server.use(express.static('dist'))
} else {
  server = new webpackDevServer(compiler,{
      contentBase: './dist',
      hot: true
  });
}
 
server.listen(SERVER_PORT_NUMBER, function(){
  console.log('server is listening in on ' + SERVER_PORT_NUMBER)
});