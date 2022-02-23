const salesModel = require('../models/sales');

const editObjectKeys = (obj) => ({
  saleId: obj.sale_id,
  productId: obj.product_id,
  quantity: obj.quantity,
  date: obj.date });

const getSales = async () => {
  const result = await salesModel.read();
  const newArray = result.map((obj) => (editObjectKeys(obj)));
  return newArray;
};

const getSaleById = async (id) => {
  const result = await salesModel.readById(id);
  if (result.length) {
    const newArray = result.map((obj) => (editObjectKeys(obj)));
    return newArray;
  }
  return result;
};

const createQueryArray = (array) => {
  const matriz = array.map((obj) => [obj.productId, obj.quantity]);
   let queryArray = [];
   for (let i = 0; i < matriz.length; i += 1) {
    queryArray = [...queryArray, ...matriz[i]];
   }
   return queryArray;
};

const createSale = async (productArray) => {
  const queryArray = createQueryArray(productArray);
  const result = await salesModel.create(productArray, queryArray);
  return result;
};

const updateSale = async (id, productArray) => {
  const result = await salesModel.update(id, productArray);
  return result;
};

const deleteSale = async (id) => {
  const result = await salesModel.exclude(id);
  return result;
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};