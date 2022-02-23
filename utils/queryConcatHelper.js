const concatHelper = (id, array) => {
  let defaultQuery = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
  VALUES (${id}, ?, ?)`;
  for (let i = 1; i < array.length; i += 1) {
    defaultQuery += `, (${id}, ?, ?)`;
 }
 return defaultQuery;
};

module.exports = concatHelper;