const knex = require('./connection');

function getEmployeesByShopID(id) {
  return knex('employees').where('shop_id', parseInt(id));
}

module.exports = {
  getEmployeesByShopID
};
