const salesServices = require('../services/sales');

const getAllSales = async (req, res, next) => {
  try {
    const result = await salesServices.getSales();
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesServices.getSaleById(+id);
    if (result.code) return res.status(result.code).json({ message: result.message });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const createNewSale = async (req, res, next) => {
  try {
    const saleArray = [...req.body];
    const result = await salesServices.createSale(saleArray);
    return res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const updateASale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleArray = [...req.body];
    const result = await salesServices.updateSale(id, saleArray);
    if (result.code) return res.status(result.code).json({ message: result.message });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const deleteASale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesServices.deleteSale(+id);
    if (result.code) return res.status(result.code).json({ message: result.message });
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createNewSale,
  updateASale,
  deleteASale,
};