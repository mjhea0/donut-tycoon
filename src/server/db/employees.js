const knex = require('./connection');

function getEmployees() {
  return knex('employees').select('*');
}

function getEmployeesByShopID(id) {
  return knex('employees').where('shop_id', parseInt(id));
}

function removeEmployeesByShopID(id) {
  return knex('employees').where('shop_id', parseInt(id)).del();
}

module.exports = {
  getEmployees,
  getEmployeesByShopID,
  removeEmployeesByShopID
};
