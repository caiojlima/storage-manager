const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/products');
const { productsRouter } = require('../../../controllers/routes');

describe('Testando rotas', () => {
  before(() => {
    sinon.stub(productsRouter, 'get').returns();
  });
  describe('Testando rota /products', () => { 
    it('testando rota /get', () => {
      productsRouter.get('/', productsController.getAllProducts);
      expect(productsRouter.get.calledWith('/', productsController.getAllProducts));
    });
   });
});
