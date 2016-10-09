exports.up = (knex, Promise) => {
  return knex.schema.createTable('donuts', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('topping').notNullable();
    table.integer('price').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('donuts');
};
