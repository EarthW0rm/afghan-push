const port = 8080;
const bodyParser = require('body-parser');
const express = require('express');
const allowCors = require('./config/cors');
const queryParser = require('express-query-int');

const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(allowCors);
server.use(queryParser());

server.listen(port, function(){
    console.log(`BACKEND is running, port: ${port}`);
});

module.exports = server;