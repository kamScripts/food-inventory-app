const { Router } = require('express');
const inventoryController = require('../controllers/inventoryController');
const inventoryRouter = Router();

// inventory routes

inventoryRouter.get('/', inventoryController.all_products);
inventoryRouter.get('/category', inventoryController.all_categories)
inventoryRouter.get('/category/:category', inventoryController.category_get);
inventoryRouter.get('/:id', inventoryController.item_get);

module.exports = inventoryRouter;


