const knex = require('./connection');

function getDonuts() {
  return knex('donuts').select('*');
}

function getDonut(id) {
  return knex('donuts').where('id', parseInt(id)).first();
}

module.exports = {
  getDonuts,
  getDonut
};
