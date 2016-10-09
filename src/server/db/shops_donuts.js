const knex = require('./connection');

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

module.exports = {
  getDonutsByShopID
};
