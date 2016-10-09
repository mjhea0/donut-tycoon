(function(routeConfig) {

  'use strict';

  routeConfig.init = (app) => {

    // *** routes *** //
    const routes = require('../routes/index');
    const shopRoutes = require('../routes/shops');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/shops', shopRoutes);

  };

})(module.exports);
