const connection = require('./connection');

const read = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM sql10475417.products;',
  );
  return result;
};

const readById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM sql10475417.products WHERE id = ?;',
    [id],
  );

  return result;
};

const create = async ({ name, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO sql10475417.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );
  return result;
};

const update = async ({ id, name, quantity }) => {
  const [result] = await connection.execute(
    'UPDATE sql10475417.products SET name = ?, quantity = ? where id = ?;',
    [name, quantity, id],
  );
  return result;
};

const exclude = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM sql10475417.products WHERE id = ?;',
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