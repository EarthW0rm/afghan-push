const port = 8080;
const express = require('express');
const bodyParser = require('body-parser');
const allowCorsMiddleware = require('./config/cors');
const queryParser = require('express-query-int');
const database = require('../database/database');
const server = express();
const Result = require('../api/Common/result');
var validator = require('express-validator');

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(queryParser());
server.use(allowCorsMiddleware);

server.use(validator());
server.use(database.startMiddleware);
require('./routes')(server);


server.use((req, res, next) => {
    let result = new Result(res.errors, res.data, req.path);
    res.status(200).send(result);
    console.log(result);
    next();
});

server.use((err, req, res, next) => {
    console.log(err);
    next();
});

server.listen(port, function(){
    console.log(`DATA-APP is running, port: ${port}`);
});

module.exports = server;