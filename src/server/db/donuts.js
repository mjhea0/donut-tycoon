const knex = require('./connection');

function getDonuts() {
  return knex('donuts').select('*');
}

function getDonut(id) {
  return knex('donuts').where('id', parseInt(id)).first();
}

function addDonut(obj) {
  return knex('donuts').insert(obj).returning('id');
}

function removeDonut(id) {
  return knex('donuts').where('id', parseInt(id)).first().del();
}

module.exports = {
  getDonuts,
  getDonut,
  addDonut,
  removeDonut
};
