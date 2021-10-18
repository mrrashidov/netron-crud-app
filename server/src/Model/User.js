export default class User {
  constructor(database, table) {
    this.database = database;
    this.table = this.table;
  }
  all () {
    return this.database("users").select().from("users")
  }
  insert (name) {
    return this.database(this.table).insert(name)
  }
}
