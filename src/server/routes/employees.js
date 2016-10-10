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

router.get('/:id/show', (req, res, next) => {
  const renderObject = {
    messages: req.flash('messages')
  };
  return employeeQueries.getEmployee(parseInt(req.params.id))
  .then((employee) => {
    renderObject.title = `Donut Tycoon - ${employee.last_name}`;
    renderObject.employee = employee;
    return Promise.all([
      donutQueries.getDonut(parseInt(employee.favorite_donut)),
      shopQueries.getShop(parseInt(employee.shop_id))
    ]);
  })
  .then((response) => {
    renderObject.donut = response[0];
    renderObject.shop = response[1];
    res.render('employees/employee.html', renderObject);
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

router.get('/:id/edit', (req, res, next) => {
  const renderObject = {
    title: 'Donut Tycoon - update employee',
    messages: req.flash('messages')
  };
  return donutQueries.getDonuts()
  .then((donuts) => {
    renderObject.donuts = donuts;
    return shopQueries.getShops();
  })
  .then((shops) => {
    renderObject.shops = shops;
    return employeeQueries.getEmployee(parseInt(req.params.id));
  })
  .then((employee) => {
    renderObject.employee = employee;
    res.render('employees/edit.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.post('/edit', (req, res, next) => {
  const shopID = parseInt(req.body.id);
  delete req.body.id;
  return employeeQueries.updateEmployee(shopID, req.body)
  .then(() => {
    req.flash('messages', {
      status: 'success',
      value: 'Employee updated.'
    });
    res.redirect('/employees');
  })
  .catch((err) => {
    return next(err);
  });
});

module.exports = router;
