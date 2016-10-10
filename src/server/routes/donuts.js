const express = require('express');
const router = express.Router();

const donutQueries = require('../db/donuts');

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

module.exports = router;
