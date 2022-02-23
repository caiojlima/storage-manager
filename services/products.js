const productsModel = require('../models/products');

const getProducts = async () => {
  const products = await productsModel.read();
  return products;
};

const getProductsById = async (id) => {
  const products = await productsModel.readById(id);
  if (!products.length) return { code: 404, message: 'Product not found' };

  return products[0];
};

const createProduct = async ({ name, quantity }) => {
  const newProduct = await productsModel.create({ name, quantity });
  const id = newProduct.insertId;

  return { id, name, quantity };
};

const updateProduct = async ({ id, name, quantity }) => {
  const updatedProduct = await productsModel.update({ id, name, quantity });
  if (!updatedProduct.affectedRows) return { code: 404, message: 'Product not found' };
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const result = await productsModel.exclude(id);
  if (!result.affectedRows) return { code: 404, message: 'Product not found' };
  return { code: 204 };
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};