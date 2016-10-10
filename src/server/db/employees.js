const knex = require('./connection');

function getEmployees() {
  return knex('employees').select('*');
}

function getEmployeesByShopID(id) {
  return knex('employees').where('shop_id', parseInt(id));
}

function addEmployee(obj) {
  return knex('employees').insert(obj);
}

function removeEmployeesByShopID(id) {
  return knex('employees').where('shop_id', parseInt(id)).del();
}

module.exports = {
  getEmployees,
  getEmployeesByShopID,
  addEmployee,
  removeEmployeesByShopID
};
