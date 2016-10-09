exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('donuts').insert({
      name: 'Pot Hole',
      topping: 'Chocolate frosting and Oreos',
      price: 3
    }),
    knex('donuts').insert({
      name: 'Chuckles',
      topping: 'Chocolate frosting, dipped in mocha powder, and topped with peanuts and caramel & chocolate drizzle',
      price: 4
    }),
    knex('donuts').insert({
      name: 'Bacon Maple Bar',
      topping: 'Maple frosting and bacon',
      price: 20
    })
  ]);
};
