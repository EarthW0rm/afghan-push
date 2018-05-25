const database = require('../database/database');
const { checkSchema } = require('express-validator/check');

module.exports = (router) => {
    const apiUrl = '/todos';

    router.get(apiUrl, (req, res, next) => {
        let queryString = "\
        SELECT ID, DESCRIPTION, DONE, CREATEDAT \
            FROM TODOS \
            ORDER BY CREATEDAT DESC";

        database.dbConnection.query(
            queryString
            , (err, result, fields) => {
                res.status(200).send(result);   
                next();
            });        
    });

    router.post(apiUrl, (req, res, next) => {
        req.checkBody("description", "Descricao é obrigatória.").exists();


        var errors = req.validationErrors();
        if (errors) {
            res.send(errors);
            return;
        }
  
        res.status(200).send({value: 'Say hello t may little friend'});
        console.log('POST');
        next();
    });

    router.put(apiUrl, (req, res, next) => {
        res.status(200).send({value: 'Say hello t may little friend'});
        console.log('PUT');
        next();
    });

    router.delete(apiUrl, (req, res, next) => {
        res.status(200).send({value: 'Say hello t may little friend'});
        console.log('DELETE');
        next();
    });

}