const express = require('express');
const productsController = require('./products');
const salesController = require('./sales');
const { nameValidation, nameExistenceValidation, nameLengthValidation,
  quantityValidation, quantityValueValidation,
  productIdValidation, productQuantityValidation } = require('../middlewares/validations');

const productsRouter = express.Router();
const salesRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts);

productsRouter.get('/:id', productsController.getProductById);

productsRouter.post('/', nameValidation, nameLengthValidation, nameExistenceValidation,
quantityValidation, quantityValueValidation, productsController.addProduct);

productsRouter.put('/:id', nameValidation, nameLengthValidation,
quantityValidation, quantityValueValidation, productsController.updateAProduct);

productsRouter.delete('/:id', productsController.deleteAProduct);

salesRouter.get('/', salesController.getAllSales);

salesRouter.get('/:id', salesController.getSaleById);

salesRouter.post('/', productIdValidation, productQuantityValidation,
salesController.createNewSale);

salesRouter.put('/:id', productIdValidation, productQuantityValidation,
salesController.updateASale);

salesRouter.delete('/:id', salesController.deleteASale);

module.exports = {
  productsRouter,
  salesRouter,
};