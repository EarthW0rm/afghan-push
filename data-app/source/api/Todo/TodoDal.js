class TodoDal {   

    validateModel(_model, onAction) {
        Object.keys(this.dataSchema).forEach((key) => {            
            if(this.dataSchema[key].required 
                && this.dataSchema[key].required.indexOf(onAction) >= 0 && !_model[key]) {
                throw new Error(`Parametro requerido nao informado '${key}'`);
            }
            
            if(this.dataSchema[key].type && _model[key]){
                switch(this.dataSchema[key].type){
                    case 'number':
                        if(isNaN(parseInt(_model[key])))
                            throw new Error(`Parametro de tipo number invalido '${key}'`);
                        break;
                    case 'boolean':
                        if(String(_model[key]) != "true" && String(_model[key]) != "false" )
                            throw new Error(`Parametro de tipo boolean invalido '${key}'`);
                        break;
                    case 'date':
                        var dateTest = new Date(_model[key]);
                        if(isNaN(dateTest.valueOf()))
                            throw new Error(`Parametro de tipo date invalido '${key}'`);
                        break;
                }
            }            
        });
    }

    getOrderBy(_model){
        if(_model.orderBy && _model.orderBy.length > 1){
            let direction = _model.orderBy.substr(0,1) == '-' ? 'DESC' : 'ASC';
            let orderbyfield = _model.orderBy.substr(1);

            if(this.dataSchema[orderbyfield]){
                return ` ORDER BY ${orderbyfield} ${direction}`;
            }
        }

        return '';
    }

    constructor(_dbConnection){
        this.dbConnection = _dbConnection;
        this.dataSchema = {
            id: { type: 'number', required: ['DEL', 'UPD'] }
            , description: {type: 'string', required: ['INS'], min: 3 }
            , done: { type: 'boolean'}
            , createdAt: { type: 'date'}
        }
    }

    async select(_model) {
        let prm = await new Promise((fulfill, reject) => {

            try{
                this.validateModel(_model);

                let parmsArray = [];

                let queryString = "\
                SELECT ID as id, DESCRIPTION as description, DONE as done, CREATEDAT as createdAt \
                    FROM TODOS WHERE 1=1 "
                
                if(_model.id){
                    queryString += " AND ID = ?";
                    parmsArray.push(_model.id);
                }
                
                if(_model.description){
                    queryString += " AND DESCRIPTION = ?";
                    parmsArray.push(_model.description);
                }

                queryString += this.getOrderBy(_model);

                this.dbConnection.query(
                    queryString 
                    , parmsArray
                    , (err, result, fields) => {
                        if(err) reject(err);
                        fulfill(result);
                    });

            } catch(err){
                reject(err);
            }
        });

        return prm;
    }

    async insert(_model) {
        let prm = await new Promise((fulfill, reject) => {

            try{
                this.validateModel(_model, 'INS');

                let parmsArray = [_model.description];
            
                this.dbConnection.query(
                    "INSERT INTO TODOS (DESCRIPTION) VALUES (?)" 
                    , parmsArray
                    , (err, result, fields) => {
                        if(err) throw err;
                    });   
                
                this.dbConnection.query(
                    "SELECT LAST_INSERT_ID() AS id"
                    , (err, result, fields) => {
                        if(err) reject(err);
                        fulfill(result);
                    });
            } catch(err){
                reject(err);
            }
            
        });
        
        return prm;
    }

    async update(_model){
        let prm = await new Promise((fulfill, reject) => {

            try{
                this.validateModel(_model, 'UPD');

                let parmsArray = [];

                let queryString = "UPDATE TODOS SET ";

                if(!_model.description  && !_model.done)
                    throw new Error("Nao foram informados parametros minimos para atualizacao de registros");

                if(_model.description){
                    queryString += " DESCRIPTION = ?,";
                    parmsArray.push(_model.description);
                }

                if(_model.done){
                    queryString += " DONE = ?,";
                    parmsArray.push(_model.done);
                }

                queryString = queryString.slice(0, -1);

                queryString += " WHERE ID = ? "; 
                parmsArray.push(_model.id);
                
                this.dbConnection.query(
                    queryString
                    , parmsArray
                    , (err, result, fields) => {
                        if(err) reject(err);
                        fulfill([{id: _model.id}]);
                    });  

            } catch(err){
                reject(err);
            }
        });
        
        return prm;
    }

    async delete(_model){
        let prm = await new Promise((fulfill, reject) => {
            try{
                this.validateModel(_model, 'DEL');

                let parmsArray = [_model.id];
                let queryString = "DELETE FROM TODOS WHERE ID = ?";
                
                this.dbConnection.query(
                    queryString
                    , parmsArray
                    , (err, result, fields) => {
                        if(err) reject(err);
                        fulfill({sucess: true});
                    });
            } catch(err){
                reject(err);
            }
        });
        
        return prm;
    }
}

module.exports = TodoDal;