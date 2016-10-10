(function(routeConfig) {

  'use strict';

  routeConfig.init = (app) => {

    // *** routes *** //
    const routes = require('../routes/index');
    const shopRoutes = require('../routes/shops');
    const employeeRoutes = require('../routes/employees');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/shops', shopRoutes);
    app.use('/employees', employeeRoutes);

  };

})(module.exports);
