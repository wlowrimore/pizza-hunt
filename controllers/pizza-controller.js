const {
  Pizza
} = require('../models');

// Get all Pizzas
const pizzaController = {
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({
        _id: -1
      })
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Get one Pizza
  getPizzaById({
    params
  }, res) {
    Pizza.findOne({
        _id: params.id
      })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({
            message: 'No pizza found with this id!'
          });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Create a Pizza
  createPizza({
    body
  }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },

  // Update Pizza by Id
  updatePizza({
    params,
    body
  }, res) {
    Pizza.findOneAndUpdate({
        _id: params.id
      }, body, {
        new: true,
        runValidator: true
      })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({
            message: 'No pizza found with this i!'
          });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },

  // Delete Pizza
  deletePizza({
    params
  }, res) {
    Pizza.findOneAndDelete({
        _id: params.id
      })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({
            message: 'No pizza found with this id!'
          });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;