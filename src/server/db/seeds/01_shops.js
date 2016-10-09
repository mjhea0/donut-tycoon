exports.seed = (knex, Promise) => {
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
};
