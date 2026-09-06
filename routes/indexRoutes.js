const { Router } = require('express');
const indexController = require('../controllers/indexController');
const indexRouter = Router();


//index routes
indexRouter.get('/', indexController.get_index);
indexRouter.get('/create', indexController.get_create);
module.exports=indexRouter;