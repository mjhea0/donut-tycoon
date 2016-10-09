exports.up = (knex, Promise) => {
  return knex.schema.createTable('shops', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('city').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('shops');
};
