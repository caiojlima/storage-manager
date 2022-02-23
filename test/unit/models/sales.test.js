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
]

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

});