const Model = require("./Model");

module.exports = class TodoTranslations extends Model {
    constructor(database) {
        super(database, "todo_translations");
    }
    async getTodoTranslations(){
        return this.database("todo_translations").select();
    }
}