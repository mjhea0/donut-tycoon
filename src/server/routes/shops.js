const express = require('express');
const router = express.Router();

const shopQueries = require('../db/shops');

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

module.exports = router;
