class Result {
    constructor(_errs, _data, _path){
        this.success = true;
        this.path = _path;
        this.errors = [];
        this.data = _data;
        this.status = 200;

        if(typeof _data == 'undefined')
            _errs = [new Error('Empty response')];

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