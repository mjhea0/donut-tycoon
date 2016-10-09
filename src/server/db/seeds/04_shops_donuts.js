exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('shops').select('id'),
    knex('donuts').select('id')
  ])
  .then((res) => {
    const shops = res[0];
    const donuts = res[1];
    return Promise.all([
      knex('shops_donuts').insert({
        shop_id: shops[0].id,
        donut_id: donuts[0].id
      }),
      knex('shops_donuts').insert({
        shop_id: shops[0].id,
        donut_id: donuts[1].id
      }),
      knex('shops_donuts').insert({
        shop_id: shops[0].id,
        donut_id: donuts[2].id
      }),
      knex('shops_donuts').insert({
        shop_id: shops[1].id,
        donut_id: donuts[0].id
      }),
      knex('shops_donuts').insert({
        shop_id: shops[1].id,
        donut_id: donuts[1].id
      }),
      knex('shops_donuts').insert({
        shop_id: shops[2].id,
        donut_id: donuts[0].id
      })
    ]);
  });
};
