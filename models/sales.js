const connection = require('./connection');
const concatHelper = require('../utils/queryConcatHelper');
const productQuantityAvailable = require('../utils/productQuantityAvailable');

const read = async () => {
  const [result] = await connection.execute(
    `SELECT p.*, s.date from sql10475417.sales_products as p INNER JOIN
    sql10475417.sales as s where p.sale_id = s.id;`,
  );
  return result;
};

const readById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
    p.product_id, p.quantity, s.date from sql10475417.sales_products p
    INNER JOIN sql10475417.sales s where p.sale_id = s.id AND  p.sale_id = ?;`,
    [id],
  );

  if (!result.length) return { code: 404, message: 'Sale not found' };

  return result;
};

const create = async (productsArray, queryArray) => {
    const date = new Date();
    const [[salesQuery], isQuantityAvailable] = await Promise.all([connection.execute(
      `INSERT INTO sql10475417.sales (date) VALUES (${date.getDate()});`,
      ), await productQuantityAvailable(productsArray, queryArray)]);
    
    const id = salesQuery.insertId;

    const query = concatHelper(id, productsArray);

  await connection.execute(
    query,
    queryArray,
  );

  await connection.execute(
    'UPDATE sql10475417.products SET quantity = quantity - ? WHERE id = ?;',
    [productsArray[0].quantity, queryArray[0]],
  );

  return isQuantityAvailable || {
    id,
    itemsSold: productsArray,
  };
};

const update = async (id, productsArray) => {
  const { productId, quantity } = productsArray[0];
  const [result] = await connection.execute(
    `UPDATE sql10475417.sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ?`,
    [productId, quantity, id],
  );

  if (!result.affectedRows) return { code: 404, message: 'Sale not found' };

  return {
    saleId: id,
    itemUpdated: productsArray,
  };
};

const exclude = async (id) => {
  const [salesResult, [result]] = await Promise.all([readById(id), connection.execute(
  'DELETE FROM sql10475417.sales_products WHERE sale_id = ?;',
  [id],
  )]);

  if (!result.affectedRows) return { code: 404, message: 'Sale not found' };

  if (salesResult.length === 1) {
    await connection.execute(
      'UPDATE sql10475417.products SET quantity = quantity + ? WHERE id = ?;',
      [salesResult[0].quantity, salesResult[0].product_id],
    );
  }

  return result;
};

module.exports = {
  read, 
  readById,
  create,
  update,
  exclude,
};
