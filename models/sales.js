const connection = require('./connection');

const read = async () => {
  const [result] = await connection.execute(
    `SELECT p.*, s.date from StoreManager.sales_products as p INNER JOIN
    StoreManager.sales as s where p.sale_id = s.id;`,
  );
  return result;
};

const readById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
    p.product_id, p.quantity, s.date from StoreManager.sales_products p
    INNER JOIN StoreManager.sales s where p.sale_id = s.id AND  p.sale_id = ?;`,
    [id],
  );

  if (!result.length) return { code: 404, message: 'Sale not found' };

  return result;
};

const create = async (productsArray, queryArray) => {
  const [salesQuery] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );
  const id = salesQuery.insertId;

  let query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
   VALUES (${id}, ?, ?)`;

   for (let i = 1; i < productsArray.length; i += 1) {
      query += `, (${id}, ?, ?)`;
   }
  
  await connection.execute(
    query,
    queryArray,
  );

  return {
    id,
    itemsSold: productsArray,
  };
};

const update = async (id, productsArray) => {
  const { productId, quantity } = productsArray[0];
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales_products
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

module.exports = {
  read,
  readById,
  create,
  update,
};
