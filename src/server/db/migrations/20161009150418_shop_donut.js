exports.up = (knex, Promise) => {
  return knex.schema.createTable('shops_donuts', (table) => {
    table.increments();
    table.integer('shop_id').references('id').inTable('shops');
    table.integer('donut_id').references('id').inTable('donuts');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('shops_donuts');
};
