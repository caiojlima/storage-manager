const sinon = require('sinon');
const { expect } = require('chai');

const productModels = require('../../../models/products');
const productServices = require('../../../services/products');

const getAllReturn = [
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

const id = 1;

const objectExample = { name: 'Torneira elétrica', quantity: 1 };

const readByIdReturn = [
  {
  "id": 1,
  "name": "Martelo de Thor",
  "quantity": 10
  }
];

const affectedRowsReturn = { affectedRows: 1 };

const affectedRowsReturnWithWrongId = { affectedRows: 0 };

const createReturn = { insertId: 1 };

const productNotFound = { code: 404, message: 'Product not found' };

describe('Testando os productsServices', () => {
  describe('1- Testando o productServices.getProducts', () => {
    before(() => {
      sinon.stub(productModels, 'read').returns(getAllReturn);
    });

    after(() => {
      productModels.read.restore();
    });

    it('Testando se o retorno da funçao getProducts está correta', async () => {
      await productServices.getProducts();
      expect(productModels.read.calledWith()).to.be.equal(true);
    });
  });

  describe('2 - Testando o productServices.getProductsById', () => {
    describe('Testando com ID válido', () => {
      before(() => {
        sinon.stub(productModels, 'readById').returns(readByIdReturn);
      });
  
      after(() => {
        productModels.readById.restore();
      });
  
      it('Testando se o retorno da funçao getProductsById está correta', async () => {
        await productServices.getProductsById(id);
  
        expect(productModels.readById.calledWith(id)).to.be.equal(true);
  
      });
    })
    describe('Testando com ID inválido', () => {
      before(() => {
        sinon.stub(productModels, 'readById').returns([]);
      });
  
      after(() => {
        productModels.readById.restore();
      });
      it('Testando se o retorno é correto ao informar ID que não existe', async () => {
        await productServices.getProductsById(id);
        expect(productModels.readById.calledWith(id)).to.be.equal(true);
      });
    });
  });

  // describe('3 - Testando o productServices.createProduct', () => {
  //   before(() => {
  //     sinon.stub(productServices, 'getProducts').returns(getAllReturn);
  //     sinon.stub(productModels, 'create').returns(createReturn);
  //   });

  //   after(() => {
  //     productModels.create.restore();
  //     productServices.getProducts.restore();
  //   });

  //   it('Testando se o retorno da funçao createProduct está correta', async () => {
  //     await productServices.createProduct(objectExample);

  //     expect(productModels.create.calledWith(objectExample)).to.be.equal(true);
  //   });
  // });

  describe('4 - Testando o productServices.updateProduct', () => {
    describe('Testando com ID válido', () => {
      before(() => {
        sinon.stub(productModels, 'update').returns(affectedRowsReturn);
      });
  
      after(() => {
        productModels.update.restore();
      });
  
      it('Testando se o retorno da funçao updateProduct está correta', async () => {
        const result = await productServices.updateProduct({ id, ...objectExample });
  
        expect(productModels.update.calledWith({ id, ...objectExample })).to.be.equal(true);
  
      });
    });
    describe('Testando com ID inválido', () => {
      before(() => {
        sinon.stub(productModels, 'update').returns(affectedRowsReturnWithWrongId);
      });
  
      after(() => {
        productModels.update.restore();
      });
      it('Testando se o retorno é correto ao informar ID que não existe', async () => {
        await productServices.updateProduct({ id, ...objectExample });
        expect(productModels.update.calledWith({ id, ...objectExample })).to.be.equal(true);
      });
    });
  });

  describe('5 - Testando o productServices.deleteProduct', () => {
    describe('Testando com ID Válido', () => {
      before(() => {
        sinon.stub(productModels, 'exclude').returns(affectedRowsReturn);
      });
  
      after(() => {
        productModels.exclude.restore();
      });
  
      it('Testando se o retorno da funçao deleteProduct está correta', async () => {
        await productServices.deleteProduct(id);
  
        expect(productModels.exclude.calledWith(id)).to.be.equal(true);
      });
    });

    describe('Testando com ID inválido', () => {
      before(() => {
        sinon.stub(productModels, 'exclude').returns(affectedRowsReturnWithWrongId);
      });
  
      after(() => {
        productModels.exclude.restore();
      });
      it('Testando se o retorno é correto ao informar ID que não existe', async () => {
        await productServices.deleteProduct(0);
        expect(productModels.exclude.calledWith(0)).to.be.equal(true);
      });
    });
  });
});