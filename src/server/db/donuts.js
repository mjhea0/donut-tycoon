const knex = require('./connection');

function getDonuts() {
  return knex('donuts').select('*');
}

module.exports = {
  getDonuts
};
