exports.seed = (knex, Promise) => {
  return knex('shops').del()
  .then(() => {
    return Promise.all([
      knex('shops').insert({
        name: 'Fluffy Fresh Donuts',
        city: 'Denver'
      }),
      knex('shops').insert({
        name: 'Jelly Donut',
        city: 'Denver'
      }),
      knex('shops').insert({
        name: 'Happy Donuts',
        city: 'Boulder'
      })
    ]);
  });
};
