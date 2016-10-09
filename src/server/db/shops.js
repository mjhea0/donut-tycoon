const knex = require('./connection');

function getShops() {
  return knex('shops').select('*');
}

function addShop(obj) {
  return knex('shops').insert(obj);
}

module.exports = {
  getShops,
  addShop
};
