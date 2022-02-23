const productsServices = require('../services/products');

const nameValidation = (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    next();
  } catch (e) {
    next(e);
  }
};

const nameLengthValidation = (req, res, next) => {
  try {
    const { name } = req.body;
    if (name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const nameExistenceValidation = async (req, res, next) => {
  try {
    const { name } = req.body;
    const allProducts = await productsServices.getProducts();
    if (allProducts.some((obj) => obj.name === name)) {
      return res.status(409).json({ message: 'Product already exists' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const quantityValidation = (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (!quantity && typeof quantity !== 'number') {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const quantityValueValidation = (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (quantity < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const productIdValidation = (req, res, next) => {
  try {
    const saleArray = [...req.body];
    const isProductIdValid = saleArray.some(({ productId }) => !productId);
    if (isProductIdValid) return res.status(400).json({ message: '"productId" is required' });
    next();
  } catch (e) {
    next(e);
  }
};

const productQuantityValidation = (req, res, next) => {
  try {
    const saleArray = [...req.body];
    const isQuantityValid = saleArray.some(({ quantity }) =>
    !quantity && typeof quantity !== 'number');
    if (isQuantityValid) return res.status(400).json({ message: '"quantity" is required' });
    const isValueValid = saleArray.some(({ quantity }) => quantity <= 0);
    if (isValueValid) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  nameValidation,
  nameLengthValidation,
  quantityValidation,
  quantityValueValidation,
  nameExistenceValidation,
  productIdValidation,
  productQuantityValidation,
};