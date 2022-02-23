const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/sales');
const connection = require('../../../models/connection');

const sales = [
	{
		"saleId": 1,
		"productId": 1,
		"quantity": 5,
		"date": "2022-02-23T22:51:51.000Z"
	},
	{
		"saleId": 1,
		"productId": 2,
		"quantity": 10,
		"date": "2022-02-23T22:51:51.000Z"
	},
	{
		"saleId": 2,
		"productId": 3,
		"quantity": 15,
		"date": "2022-02-23T22:51:51.000Z"
	}
];

const objectUpdate = {
  saleId: 1,
  itemsSold: [{
    "productId": 1,
    "quantity": 2
  }],
}

const productArray = [
  {
    "productId": 1,
    "quantity": 2
  }
]

const affectedRows = { affectedRows: 1 };

describe('Testando salesModels', () => {
  describe('1- testando salesModels.read', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([sales, []]);

    });

    after(() => {
      connection.execute.restore();

    });

    it('verifica se a função read tem o retorno esperado', async () => {
      const result = await salesModel.read();
      expect(result).to.be.an('array');
      expect(result).to.be.equal(sales);

    });

  });

  describe('2- testando salesModels.readById', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[sales[0]], []]);

    });

    after(() => {
      connection.execute.restore();

    });

    it('verifica se a função readById tem o retorno esperado', async () => {
      const result = await salesModel.readById();
      expect(result).to.be.an('array');
      expect(result[0]).to.be.equal(sales[0]);

    });

  });

  describe('3- testando salesModels.update', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[affectedRows], []]);

    });

    after(() => {
      connection.execute.restore();

    });

    it('verifica se a função update tem o retorno esperado', async () => {
      const result = await salesModel.update(1, productArray);
      expect(result).to.be.an('object');

    });

  });

});