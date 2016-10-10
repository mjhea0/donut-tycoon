const knex = require('./connection');

function getEmployeesByShopID(id) {
  return knex('employees').where('shop_id', parseInt(id));
}

function removeEmployeesByShopID(id) {
  return knex('employees').where('shop_id', parseInt(id)).del();
}

module.exports = {
  getEmployeesByShopID,
  removeEmployeesByShopID
};
