const productsService = require('../services/products');

const getAllProducts = async (req, res, next) => {
  try {
    const result = await productsService.getProducts();
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.getProductsById(+id);
    if (result.code) return res.status(result.code).json({ message: result.message });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await productsService.createProduct({ name, quantity });
    return res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const updateAProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await productsService.updateProduct({ id, name, quantity });
    if (result.code) return res.status(result.code).json({ message: result.message });
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const deleteAProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.deleteProduct(+id);
    if (result.code === 404) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(result.code).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateAProduct,
  deleteAProduct,
};
