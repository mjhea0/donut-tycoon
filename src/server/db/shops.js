const knex = require('./connection');

function getShops() {
  return knex('shops').select('*');
}

function getShop(id) {
  return knex('shops').where('id', parseInt(id)).first();
}

function addShop(obj) {
  return knex('shops').insert(obj);
}

function updateShop(id, obj) {
  return knex('shops').update(obj).where('id', parseInt(id));
}

function removeShop(id) {
  return knex('shops').where('id', parseInt(id)).first().del();
}

module.exports = {
  getShops,
  getShop,
  addShop,
  updateShop,
  removeShop
};
