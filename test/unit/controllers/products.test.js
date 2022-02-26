const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../../controllers/products');
const productServices = require('../../../services/products');

const getAllProductsReturn = [
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
];

const errorResponse = Error('Ops... Algo deu errado!');

const getProductByIdReturn = {
  "id": 1,
  "name": "Martelo de Thor",
  "quantity": 10
};

const returnWithWrongId = { code: 404, message: "Product not found" };

const addProductReturn = {
	"id": 1,
	"name": "Escova de cabelo",
	"quantity": 25
}

const updateProductReturn = {
	"id": 1,
	"name": "Escova de cabelo",
	"quantity": 35
}

const deleteProductReturn = {
  code: 204,
};

describe('Testando os productsControllers', () => {
  const req = {}; const res = {}; let next = () => {};
  describe('1 - Testando se productsController.getAllProducts', () => {
    describe('Testes sem erros', () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productServices, 'getProducts').returns(getAllProductsReturn);
      });
  
      after(() => {
        productServices.getProducts.restore();
      });
  
      it('Testa se o productsController.getAllProducts tem o status esperado', async () => {
        await productController.getAllProducts(req, res, next);
  
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
  
      it('Testa se o productsController.getAllProducts tem o retorno esperado', async () => {
        await productController.getAllProducts(req, res, next);
  
        expect(res.json.calledWith(getAllProductsReturn)).to.be.equal(true);
      });
    });

    describe('Testando os erros', () => {
      before(() => {
        next = sinon.stub().returns();
        sinon.stub(productServices, 'getProducts').throws(errorResponse);
      });

      after(() => {
        productServices.getProducts.restore();
      });

      it('testa quando um erro é lançado se a função next é acionada com um erro', async () => {
        await productController.getAllProducts(req, res, next);
        expect(next.calledWith(errorResponse)).to.be.equal(true);
      });
     });
  });

  describe('2 - Testando se productsController.getProductById', () => {
    describe('Testando quando se tem um ID válido', () => {
      before(() => {
        req.params = sinon.stub().returns({ id: 1 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productServices, 'getProductsById').returns(getProductByIdReturn);
      });
  
      after(() => {
        productServices.getProductsById.restore();
      });
  
      it('Testa se o productsController.getProductById tem o status esperado', async () => {
        await productController.getProductById(req, res, next);
  
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
  
      it('Testa se o productsController.getProductById tem o retorno esperado', async () => {
        await productController.getProductById(req, res, next);
  
        expect(res.json.calledWith(getProductByIdReturn)).to.be.equal(true);
      });
    })
    describe('Testando quando não se tem um ID Válido', () => {
      before(() => {
        req.params = sinon.stub().returns({ id: 203 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productServices, 'getProductsById').returns(returnWithWrongId);
      });
  
      after(() => {
        productServices.getProductsById.restore();
      });
      it('Testa se o productsController.getProductById tem o status esperado', async () => {
        await productController.getProductById(req, res, next);
  
        expect(res.status.calledWith(404)).to.be.equal(true);
      });
      it('Testa se o productsController.getProductById tem o retorno esperado', async () => {
        await productController.getProductById(req, res, next);
  
        expect(res.json.calledWith({ message: "Product not found"  })).to.be.equal(true);
      });
    });
    describe('Testando os erros', () => {
      before(() => {
        next = sinon.stub().returns();
        sinon.stub(productServices, 'getProductsById').throws(errorResponse);
      });

      after(() => {
        productServices.getProductsById.restore();
      });

      it('testa quando um erro é lançado se a função next é acionada com um erro', async () => {
        await productController.getProductById(req, res, next);
        expect(next.calledWith(errorResponse)).to.be.equal(true);
      });
     });
  });
  describe('3 - Testando se productsController.addProducts', () => {
    describe('Testando sem erros', () => {

      before(() => {
        req.body = sinon.stub().returns({ name: 'Escova de cabelo', quantity: 25 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productServices, 'createProduct').returns(addProductReturn);
      });
  
      after(() => {
        productServices.createProduct.restore();
      });
  
      it('Testa se o productsController.addProduct tem o status esperado', async () => {
        await productController.addProduct(req, res, next);
  
        expect(res.status.calledWith(201)).to.be.equal(true);
      });
  
      it('Testa se o productsController.addProduct tem o retorno esperado', async () => {
        await productController.addProduct(req, res, next);
  
        expect(res.json.calledWith(addProductReturn)).to.be.equal(true);
      });
    });

    describe('Testando com produto já existente', () => {
      before(() => {
        req.body = sinon.stub().returns({ name: 'Escova de cabelo', quantity: 25 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productServices, 'createProduct').returns({ code: 409, message: 'Product already exists' });
      });
  
      after(() => {
        productServices.createProduct.restore();
      });

      it('Testa se o addProduct tem a mensagem de erro esperada', async () => {
        await productController.addProduct(req, res, next);

        expect(res.status.calledWith(409)).to.be.equal(true);

        expect(res.json.calledWith({  message: 'Product already exists' })).to.be.equal(true);
      })
    });

    describe('Testando os erros', () => {
      before(() => {
        next = sinon.stub().returns();
        sinon.stub(productServices, 'createProduct').throws(errorResponse);
      });

      after(() => {
        productServices.createProduct.restore();
      });

      it('testa quando um erro é lançado se a função next é acionada com um erro', async () => {
        await productController.addProduct(req, res, next);
        expect(next.calledWith(errorResponse)).to.be.equal(true);
      });
     });
  });

  describe('4 - Testando se productsController.updateAProduct', () => {
    describe('Testando quando se tem um ID válido', () => {
      before(() => {
        req.params = sinon.stub().returns({ id: 1 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productServices, 'updateProduct').returns(updateProductReturn);
      });
  
      after(() => {
        productServices.updateProduct.restore();
      });
  
      it('Testa se o productsController.updateAProduct tem o status esperado', async () => {
        await productController.updateAProduct(req, res, next);
  
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
  
      it('Testa se o productsController.updateAProduct tem o retorno esperado', async () => {
        await productController.updateAProduct(req, res, next);
  
        expect(res.json.calledWith(updateProductReturn)).to.be.equal(true);
      });
    })
    describe('Testando quando não se tem um ID Válido', () => {
      before(() => {
        req.params = sinon.stub().returns({ id: 203 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productServices, 'updateProduct').returns(returnWithWrongId);
      });
  
      after(() => {
        productServices.updateProduct.restore();
      });
      it('Testa se o productsController.updateAProduct tem o status esperado', async () => {
        await productController.updateAProduct(req, res, next);
  
        expect(res.status.calledWith(404)).to.be.equal(true);
      });
      it('Testa se o productsController.updateAProduct tem o retorno esperado', async () => {
        await productController.updateAProduct(req, res, next);
  
        expect(res.json.calledWith({ message: "Product not found" })).to.be.equal(true);
      });
    });
    describe('Testando os erros', () => {
      before(() => {
        next = sinon.stub().returns();
        sinon.stub(productServices, 'updateProduct').throws(errorResponse);
      });

      after(() => {
        productServices.updateProduct.restore();
      });

      it('testa quando um erro é lançado se a função next é acionada com um erro', async () => {
        await productController.updateAProduct(req, res, next);
        expect(next.calledWith(errorResponse)).to.be.equal(true);
      });
     });
  });

  describe('5 - Testando se productsController.deleteAProduct', () => {
    describe('Testando quando se tem um ID válido', () => {
      before(() => {
        req.params = sinon.stub().returns({ id: 1 });
        res.status = sinon.stub().returns(res);
        res.end = sinon.stub().returns();
        sinon.stub(productServices, 'deleteProduct').returns(deleteProductReturn);
      });
  
      after(() => {
        productServices.deleteProduct.restore();
      });
  
      it('Testa se o productsController.deleteAProduct tem o status esperado', async () => {
        await productController.deleteAProduct(req, res, next);
  
        expect(res.status.calledWith(204)).to.be.equal(true);
      });
  
      it('Testa se o productsController.deleteAProduct tem o retorno esperado', async () => {
        await productController.deleteAProduct(req, res, next);
  
        expect(res.end.calledWith()).to.be.equal(true);
      });
    })
    describe('Testando quando não se tem um ID Válido', () => {
      before(() => {
        req.params = sinon.stub().returns({ id: 203 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productServices, 'deleteProduct').returns(returnWithWrongId);
      });
  
      after(() => {
        productServices.deleteProduct.restore();
      });
      it('Testa se o productsController.deleteAProduct tem o status esperado', async () => {
        await productController.deleteAProduct(req, res, next);
  
        expect(res.status.calledWith(404)).to.be.equal(true);
      });
      it('Testa se o productsController.deleteAProduct tem o retorno esperado', async () => {
        await productController.deleteAProduct(req, res, next);
  
        expect(res.json.calledWith({ message: "Product not found" })).to.be.equal(true);
      });
    });
    describe('Testando os erros', () => {
      before(() => {
        next = sinon.stub().returns();
        sinon.stub(productServices, 'deleteProduct').throws(errorResponse);
      });

      after(() => {
        productServices.deleteProduct.restore();
      });

      it('testa quando um erro é lançado se a função next é acionada com um erro', async () => {
        await productController.deleteAProduct(req, res, next);
        expect(next.calledWith(errorResponse)).to.be.equal(true);
      });
     });
  });
});