module.exports = class Model {
  constructor(database, table) {
    this.database = database;
    this.table = table;
  }

  all(table = null, select = false) {
    return this.database(table ? table : this.table).select(
      select ? select : "*"
    );
  }

  find(where, queryBuilder = null, select = null) {
    if (queryBuilder) {
      return queryBuilder(
        this.database(this.table)
          .where(where)
          .select(select ? select : "*")
      );
    }
    return this.database(this.table)
      .where(where)
      .select(select ? select : "*");
  }

  findOne(conditions) {
    return this.database(this.table).where(conditions).first();
  }

  findById(id) {
    return this.database(this.table).where({ id }).select().first();
  }

  insert(values) {
    return this.database(this.table).insert(values);
  }

  delete(id) {
    return this.database(this.table).del(id).where({ id });
  }

  update(values, id) {
    return this.database(this.table).update(values).where({ id });
  }

  store(table = null) {
    return this.database(table ? table : this.table);
  }
};
