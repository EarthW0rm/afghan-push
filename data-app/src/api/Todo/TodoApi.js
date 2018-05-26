const database = require('../../database/database');
const TodoDal = require('./TodoDal');

module.exports = (router) => {
    const apiUrl = '/todos';
    
    router.get(apiUrl, async (req, res, next) => {
        try {
            let dal = new TodoDal(database.dbConnection);
            let result = await dal.select(req.query);
            res.data = result;
        } catch(err) {
            res.errors = [err];
        }
        next();
    });

    router.get(`${apiUrl}/:id`, async (req, res, next) => {
        try {
            let dal = new TodoDal(database.dbConnection);
            let result = await dal.select(req.params);
            res.data = result.length > 0 ? result[0] : null;
        } catch(err) {
            res.error = [err];
        }
        next();
    });

    router.post(apiUrl, async (req, res, next) => {
        try { 
            let dal = new TodoDal(database.dbConnection);
            let insertResult = await dal.insert(req.body);
            let selectResult = await dal.select(insertResult[0]);
            res.data = selectResult[0];
        } catch(err) {
            res.error = [err];
        }  
        next();
    });

    router.put(`${apiUrl}/:id` , async (req, res, next) => {
        try {
            let dal = new TodoDal(database.dbConnection);
            let model = Object.assign({}, req.body, req.params);
            let updateResult = await dal.update(model);
            res.data = model;
        } catch(err) {
            res.error = [err];
        }  
        next();
    });

    router.delete(`${apiUrl}/:id`, async (req, res, next) => {
        try {
            let dal = new TodoDal(database.dbConnection);
            let result = await dal.delete(req.params);
            res.data = result;
        } catch(err) {
            res.error = [err];
        }  
        next();
    });
}