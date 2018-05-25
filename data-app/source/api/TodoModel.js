class TodoModel {

    constructor(params, body){
        this.id = null;

        if(params || body) {
            this.id = Number.isInteger(params.id) ? params.id : null;
        }
    }

}