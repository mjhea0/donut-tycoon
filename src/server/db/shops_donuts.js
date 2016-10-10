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

function getShopsByDonutID(id) {
  return Promise.all([
    knex('shops_donuts').where('donut_id', parseInt(id)),
    knex('shops').select('*')
  ])
  .then((res) => {
    return res[1].filter((shops_donuts) => {
      return res[0].filter((shop) => {
        return shops_donuts.shop_id === shop.id;
      });
    });
  });
}

function removeShopsDonutsByShopID(id) {
  return knex('shops_donuts').where('shop_id', parseInt(id)).del();
}

function removeShopsDonutsByDonutID(id) {
  return knex('shops_donuts').where('donut_id', parseInt(id)).del();
}

module.exports = {
  addRow,
  getDonutsByShopID,
  getShopsByDonutID,
  removeShopsDonutsByShopID,
  removeShopsDonutsByDonutID
};
