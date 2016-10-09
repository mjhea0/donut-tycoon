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

module.exports = {
  getShops,
  getShop,
  addShop,
  updateShop
};
