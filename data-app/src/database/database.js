class Database {
    constructor(_host = process.env.DB_HOST, _user = process.env.DB_USER, _password = process.env.DB_PASS){
        
        this.host = _host;
        this.password = _password;
        this.user = _user;
        this.database = 'mFaustin_afghan';

        this.startMiddleware = this.startMiddleware.bind(this);

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

            console.log(`Connection start before state: ${this.dbConnection.state}`);
            this.dbConnection.connect((err) => {
                if (err) throw err;
                console.log(`Connection start state: ${this.dbConnection.state}`);
                next();
            });
        }else {
            console.log(`Connection start alredyopen state: ${this.dbConnection.state}`);
            next();
        }
    }
}

module.exports = new Database();

