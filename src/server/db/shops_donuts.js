const knex = require('./connection');

function addRow(obj) {
  return knex('shops_donuts').insert(obj);
}

function getDonutsByShopID(id) {
  return Promise.all([
    knex('shops_donuts').where('shop_id', parseInt(id)),
    knex('donuts').select('*')
  ])
  .then((donuts) => {
    return donuts[1].filter((donut) => {
      return donuts[0].filter((don) => {
        return donut.donut_id === don.id;
      });
    });
  });
}

function removeShopsDonutsByShopID(id) {
  return knex('shops_donuts').where('shop_id', parseInt(id)).del();
}

module.exports = {
  addRow,
  getDonutsByShopID,
  removeShopsDonutsByShopID
};
