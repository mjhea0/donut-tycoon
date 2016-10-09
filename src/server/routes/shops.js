const express = require('express');
const router = express.Router();

const shopQueries = require('../db/shops');
const employeesQueries = require('../db/employees');
const shopsDonutsQueries = require('../db/shops_donuts');

router.get('/', (req, res, next) => {
  return shopQueries.getShops()
  .then((shops) => {
    const renderObject = {
      title: 'Donut Tycoon - home',
      messages: req.flash('messages'),
      shops: shops
    };
    res.render('shops/shops.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/:id/show', (req, res, next) => {
  const renderObject = {
    messages: req.flash('messages')
  };
  return Promise.all([
    shopQueries.getShop(parseInt(req.params.id)),
    employeesQueries.getEmployeesByShopID(parseInt(req.params.id)),
    shopsDonutsQueries.getDonutsByShopID(parseInt(req.params.id))
  ])
  .then((response) => {
    renderObject.title = `Donut Tycoon - ${response[0].name}`;
    renderObject.shop = response[0];
    renderObject.employees = response[1];
    renderObject.donuts = response[2];
    res.render('shops/shop.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/new', (req, res, next) => {
  const renderObject = {
    title: 'Donut Tycoon - new shop',
    messages: req.flash('messages')
  };
  res.render('shops/new.html', renderObject);
});

router.post('/', (req, res, next) => {
  return shopQueries.addShop(req.body)
  .then(() => {
    req.flash('messages', {
      status: 'success',
      value: 'Shop added.'
    });
    res.redirect('/shops');
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/:id/edit', (req, res, next) => {
  return shopQueries.getShop(parseInt(req.params.id))
  .then((shop) => {
    const renderObject = {
      title: 'Donut Tycoon - update shop',
      messages: req.flash('messages'),
      shop: shop
    };
    res.render('shops/edit.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.post('/edit', (req, res, next) => {
  const shopID = parseInt(req.body.id);
  delete req.body.id;
  return shopQueries.updateShop(shopID, req.body)
  .then(() => {
    req.flash('messages', {
      status: 'success',
      value: 'Shop updated.'
    });
    res.redirect('/shops');
  })
  .catch((err) => {
    return next(err);
  });
});

module.exports = router;
