exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('shops').select('id'),
    knex('donuts').select('id')
  ])
  .then((res) => {
    const shops = res[0];
    const donuts = res[1];
    return Promise.all([
      knex('employees').insert({
        first_name: 'Lionel',
        last_name: 'Hessel',
        email: 'lionel65@hotmail.com',
        favorite_donut: donuts[0].id,
        shop_id: shops[0].id
      }),
      knex('employees').insert({
        first_name: 'Stephanie',
        last_name: 'MacGyver',
        email: 'stephanie_macGyver57@yahoo.com',
        favorite_donut: donuts[1].id,
        shop_id: shops[1].id
      }),
      knex('employees').insert({
        first_name: 'Alvena',
        last_name: 'Walker',
        email: 'alvena.walker36@yahoo.com',
        favorite_donut: donuts[2].id,
        shop_id: shops[2].id
      }),
      knex('employees').insert({
        first_name: 'Roger',
        last_name: 'Wisoky',
        email: 'roger.wisoky@hotmail.com',
        favorite_donut: donuts[1].id,
        shop_id: shops[1].id
      })
    ]);
  });
};
