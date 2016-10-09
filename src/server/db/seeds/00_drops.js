exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('shops').del(),
    knex('donuts').del(),
    knex('employees').del(),
    knex('shops_donuts').del()
  ]);
};
