class Result {
    constructor(_errs, _data){
        this.success = true;
        this.errors = [];
        this.data = _data;
        this.status = 200;
        if(_errs && _errs.length > 0){
            this.success = false;
            this.errors = _errs.map((err) => {
                return {message: err.message, stack: err.stack};
            });
            this.status = 500;
        }
    }
}

module.exports = Result;