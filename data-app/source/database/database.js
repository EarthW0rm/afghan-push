class Database {
    constructor(_host = '204.93.216.11', _user = 'mFaustin_afghan', _password = 'nqf3htDTEiWp8weq'){
        
        this.host = _host;
        this.password = _password;
        this.user = _user;
        this.database = 'mFaustin_afghan';

        this.startMiddleware = this.startMiddleware.bind(this);
        this.closeMiddleware = this.closeMiddleware.bind(this);

        console.log('Database new Instance');
    }

    startMiddleware(req, res, next){
        console.log('My SQL Middleware');

        if(!this.dbConnection || this.dbConnection.state == 'disconnected'){
            this.dbConnection = require('mysql').createConnection({
                host: this.host
                , user: this.user
                , password: this.password
                , database: this.database
            });

            this.dbConnection.connect((err) => {
                if (err) throw err;
                console.log(`Connection start state: ${this.dbConnection.state}`);
                next();
            });
        }else {
            console.log(`Connection start state: ${this.dbConnection.state}`);
        }
    }

    closeMiddleware(req, res, next){
        if(this.dbConnection.state != 'disconnected'){
            this.dbConnection.end();
            console.log(`Connection close state: ${this.dbConnection.state}`);
            next();
        } else {
            console.log(`Connection close state: ${this.dbConnection.state}`);
        }
    }
}

module.exports = new Database();

