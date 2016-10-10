const express = require('express');
const router = express.Router();

const donutQueries = require('../db/donuts');
const shopQueries = require('../db/shops');
const shopsDonutsQueries = require('../db/shops_donuts');
const employeeQueries = require('../db/employees');

router.get('/', (req, res, next) => {
  return donutQueries.getDonuts()
  .then((donuts) => {
    const renderObject = {
      title: 'Donut Tycoon - donuts',
      messages: req.flash('messages'),
      donuts: donuts
    };
    res.render('donuts/donuts.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/:id/show', (req, res, next) => {
  const renderObject = {
    messages: req.flash('messages')
  };
  return donutQueries.getDonut(parseInt(req.params.id))
  .then((donut) => {
    renderObject.title = `Donut Tycoon - ${donut.name}`;
    renderObject.donut = donut;
    return shopsDonutsQueries.getShopsByDonutID(parseInt(req.params.id));
  })
  .then((shops) => {
    renderObject.shops = shops;
    res.render('donuts/donut.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/new', (req, res, next) => {
  const renderObject = {
    title: 'Donut Tycoon - new donut',
    messages: req.flash('messages')
  };
  return donutQueries.getDonuts()
  .then((donuts) => {
    renderObject.donuts = donuts;
    return shopQueries.getShops();
  })
  .then((shops) => {
    renderObject.shops = shops;
    res.render('donuts/new.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.post('/', (req, res, next) => {
  const shopID = parseInt(req.body.shop);
  delete req.body.shop;
  return donutQueries.addDonut(req.body)
  .then((donutID) => {
    const obj = {
      shop_id: shopID,
      donut_id: parseInt(donutID[0])
    };
    return shopsDonutsQueries.addRow(obj);
  })
  .then(() => {
    req.flash('messages', {
      status: 'success',
      value: 'Donut added.'
    });
    res.redirect('/donuts');
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/:id/edit', (req, res, next) => {
  const renderObject = {
    title: 'Donut Tycoon - update donut',
    messages: req.flash('messages')
  };
  return donutQueries.getDonuts()
  .then((donuts) => {
    renderObject.donuts = donuts;
    return shopQueries.getShops();
  })
  .then((shops) => {
    renderObject.shops = shops;
    res.render('donuts/edit.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.post('/:id/delete', (req, res, next) => {
  const donutID = parseInt(req.params.id);
  return shopsDonutsQueries.removeShopsDonutsByDonutID(donutID)
  .then(() => {
    const obj = {
      favorite_donut: null
    };
    return employeeQueries.updateEmployeesByDonutID(donutID, obj);
  })
  .then(() => { return donutQueries.removeDonut(donutID); })
  .then(() => {
    req.flash('messages', {
      status: 'success',
      value: 'Donut removed.'
    });
    res.redirect('/donuts');
  })
  .catch((err) => {
    return next(err);
  });
});

module.exports = router;
