const connection = require('./connection');

const read = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return result;
};

const readById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );

  return result;
};

const create = async ({ name, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );
  return result;
};

const update = async ({ id, name, quantity }) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? where id = ?;',
    [name, quantity, id],
  );
  return result;
};

const exclude = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return result;
};

module.exports = {
  read,
  readById,
  create,
  update,
  exclude,
};