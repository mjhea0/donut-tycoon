const knex = require('./connection');

function getShops() {
  return knex('shops').select('*');
}

module.exports = {
  getShops
};
