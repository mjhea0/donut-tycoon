exports.up = (knex, Promise) => {
  return knex.schema.createTable('employees', (table) => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.integer('favorite_donut').references('id').inTable('donuts');
    table.integer('shop_id').references('id').inTable('shops').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('employees');
};
