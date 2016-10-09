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
    res.render('shops.html', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

module.exports = router;
