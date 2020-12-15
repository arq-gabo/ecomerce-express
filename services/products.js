const productsMocks = require('../utils/mocks/products');
const MongoLib = require('../lib/mongo');

class ProductsService {
    constructor() {
        this.collection = 'products';
        this.mongoDb = new MongoLib();
    }

    async getProducts({ tags }) {
        const query = tags && { tags: { $in: tags } }
        const products = await this.mongoDb.getAll(this.collection, query);
        return products || [];
    }

    async getProduct({ productId }) {
        const product = await this.mongoDb.get(this.collection, productId);
        return product || {}
    }

    async createProduct({ product }) {
        const createProductId = await this.mongoDb.create(this.collection, product)
        return createProductId;
    }

    async updateProduct({ productId, product }) {
        const updateProductId = await this.mongoDb.update(this.collection, productId, product)
        return updateProductId;
    }

    async deleteProduct({ productId }) {
        const deleteProductId = await this.mongoDb.delete(this.collection, productId);
        return deleteProductId;
    }
}

module.exports = ProductsService;