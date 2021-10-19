const Model = require("./Model");
module.exports = class Todo extends Model {
    constructor(database) {
        super(database, "todos");
    }
    async getTodos(){
        return this.database("todos").select();
    }
}