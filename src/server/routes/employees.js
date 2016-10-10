const express = require('express');
const router = express.Router();

const shopQueries = require('../db/shops');
const employeeQueries = require('../db/employees');
const donutQueries = require('../db/donuts');

router.get('/', (req, res, next) => {
  return employeeQueries.getEmployees()
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

router.get('/new', (req, res, next) => {
  const renderObject = {
    title: 'Donut Tycoon - new employee',
    messages: req.flash('messages')
  };
  return donutQueries.getDonuts()
  .then((donuts) => {
    renderObject.donuts = donuts;
    return shopQueries.getShops();
  })
  .then((shops) => {
    renderObject.shops = shops;
    res.render('employees/new.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.post('/', (req, res, next) => {
  return employeeQueries.addEmployee(req.body)
  .then(() => {
    req.flash('messages', {
      status: 'success',
      value: 'Employee added.'
    });
    res.redirect('/employees');
  })
  .catch((err) => {
    return next(err);
  });
});

module.exports = router;
