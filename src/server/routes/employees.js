const express = require('express');
const router = express.Router();

const shopQueries = require('../db/shops');
const employeesQueries = require('../db/employees');
const shopsDonutsQueries = require('../db/shops_donuts');

router.get('/', (req, res, next) => {
  return employeesQueries.getEmployees()
  .then((employees) => {
    const renderObject = {
      title: 'Donut Tycoon - employees',
      messages: req.flash('messages'),
      employees: employees
    };
    res.render('employees/employees.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

module.exports = router;
