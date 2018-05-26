const database = require('../database/database');
const { checkSchema } = require('express-validator/check');
const TodoDal = require('./TodoDal');

module.exports = (router) => {
    const apiUrl = '/todos';
    

    router.get(apiUrl, async (req, res, next) => {
        let dal = new TodoDal(database.dbConnection);
        let result = await dal.select(req.query);
        res.status(200).send(result);
        next();        
    });

    router.get(`${apiUrl}/:id`, async (req, res, next) => {
        let dal = new TodoDal(database.dbConnection);
        let result = await dal.select(req.params);
        res.status(200).send(result);
        next();        
    });

    router.post(apiUrl, async (req, res, next) => {
        let dal = new TodoDal(database.dbConnection);
        let insertResult = await dal.insert(req.body);
        let selectResult = await dal.select(insertResult[0]);
        res.status(200).send(selectResult[0]);
        next();
    });

    router.put(`${apiUrl}/:id` , async (req, res, next) => {
        let dal = new TodoDal(database.dbConnection);
        let model = Object.assign({}, req.body, req.params);
        let updateResult = await dal.update(model);
        let selectResult = await dal.select(updateResult[0]);
        res.status(200).send(selectResult);
        next();
    });

    router.delete(`${apiUrl}/:id`, async (req, res, next) => {
        let dal = new TodoDal(database.dbConnection);
        let result = await dal.delete(req.params);
        res.status(200).send(result);
        next();
    });

}