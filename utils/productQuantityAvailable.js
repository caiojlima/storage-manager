const productModel = require('../models/products');

const productQuantityAvailable = async (productsArray, queryArray) => {
  const result = await productModel.readById(queryArray[0]);

  if (result[0].quantity < productsArray[0].quantity) {
    return { code: 422, message: 'Such amount is not permitted to sell' };
  }
  return false;
};

module.exports = productQuantityAvailable;