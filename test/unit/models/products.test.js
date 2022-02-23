const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productModels = require('../../../models/products');

const executeReadReturn = [
  {
		"id": 1,
		"name": "Martelo de Thor",
		"quantity": 10
	},
	{
		"id": 2,
		"name": "Traje de encolhimento",
		"quantity": 20
	},
	{
		"id": 3,
		"name": "Escudo do Capitão América",
		"quantity": 30
	}
]

const executeReadByIdReturn = [
  {
		"id": 1,
		"name": "Martelo de Thor",
		"quantity": 10
	}
];

const exampleObject = {
  id: 1,
  name: 'Jogo de panelas inox',
  quantity: 200,
};

const affectedRowsReturn = { affectedRows: 1 };

const executeCreateReturn = { insertId: 1 };

describe('Testando os productsModels', () => {
  describe('1 - Testando productModels.read', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[executeReadReturn], []]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Testando o retorno da função read', async () => {
      const [result] = await productModels.read();
      expect(result).to.be.an('array');
      expect(result).to.be.equal(executeReadReturn);
    });
  });

  describe('2 - Testando productModels.readById', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[executeReadByIdReturn], []]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Testando o retorno da função readById', async () => {
      const [result] = await productModels.readById();
      expect(result).to.be.an('array');
      expect(result).to.be.equal(executeReadByIdReturn);
    });
  });

  describe('3 - Testando productModels.create', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[executeCreateReturn], []]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Testando o retorno da função create', async () => {
      const [result] = await productModels.create(exampleObject);
      expect(result).to.be.an('object');
    });
  });

  describe('4 - Testando productModels.update', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[affectedRowsReturn], []]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Testando o retorno da função update', async () => {
      const [result] = await productModels.update(exampleObject);
      expect(result).to.be.an('object');
    });
  });

  describe('5 - Testando productModels.exclude', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[affectedRowsReturn], []]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Testando o retorno da função exclude', async () => {
      const [result] = await productModels.exclude(exampleObject);
      expect(result).to.be.an('object');
    });
  });
});