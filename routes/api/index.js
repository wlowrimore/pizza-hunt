const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// add prifix of '/pizzas' to routes created in 'pizza-router.js'
router.use('/pizzas', pizzaRoutes);

module.exports = router;