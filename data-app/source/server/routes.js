const express = require('express');

module.exports = (server) => {
    const routerApi = express.Router();
    server.use('/api', routerApi);

    const todoApi = require('../api/TodoApi')(routerApi);

    
};