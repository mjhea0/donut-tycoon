const knex = require('./connection');

function getEmployees() {
  return knex('employees').select('*');
}

function getEmployee(id) {
  return knex('employees').where('id', parseInt(id)).first();
}

function getEmployeesByShopID(id) {
  return knex('employees').where('shop_id', parseInt(id));
}

function addEmployee(obj) {
  return knex('employees').insert(obj);
}

function updateEmployee(id, obj) {
  return knex('employees').update(obj).where('id', parseInt(id));
}

function updateEmployeesByDonutID(id, obj) {
  return knex('employees').update(obj).where('favorite_donut', parseInt(id));
}

function removeEmployee(id) {
  return knex('employees').where('id', parseInt(id)).first().del();
}

function removeEmployeesByShopID(id) {
  return knex('employees').where('shop_id', parseInt(id)).del();
}

module.exports = {
  getEmployees,
  getEmployee,
  getEmployeesByShopID,
  addEmployee,
  updateEmployee,
  updateEmployeesByDonutID,
  removeEmployee,
  removeEmployeesByShopID
};
