const express = require('express');
const authRoute = require('./auth.route');
const companiesRoute = require('./companies.route');
const docsRoute = require('./docs.route');
const soldiersRoute = require('./soldiers.route');
const textRoute = require('./text.route');
const townsRoute = require('./towns.route');
const userRoute = require('./user.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/companies',
    route: companiesRoute,
  },
  {
    path: '/soldiers',
    route: soldiersRoute,
  },
  {
    path: '/text',
    route: textRoute,
  },
  {
    path: '/towns',
    route: townsRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
