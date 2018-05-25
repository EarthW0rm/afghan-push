const port = 8080;
const express = require('express');
const bodyParser = require('body-parser');
const allowCorsMiddleware = require('./config/cors');
const queryParser = require('express-query-int');
const database = require('../database/database');
const server = express();
var validator = require('express-validator');

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(queryParser());
server.use(allowCorsMiddleware);

server.use(validator());
server.use(database.startMiddleware);
require('./routes')(server);
server.use(database.closeMiddleware);

server.listen(port, function(){
    console.log(`BACKEND is running, port: ${port}`);
});


module.exports = server;