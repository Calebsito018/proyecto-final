import { productsModel } from '../../mongoDB/models/products.model.js';
import BasicManager from './basic.manager.dao.js';

class ProductManager extends BasicManager {
    constructor() {
        super(productsModel);
    }
    async findAll(obj) {
        const { limit = 10, page = 1, sortPrice, ...query } = obj;
        if (isNaN(page) || page <= 0) {
            throw new Error("PAGE_INVALID");
        }
        if (isNaN(limit) || limit <= 0) {
            throw new Error("LIMIT_INVALID");
        }
        try {
            const options = { limit, page, lean: true };
            if (sortPrice) {
                options.sort = { price: sortPrice };
            }
            const result = await productsModel.paginate(query, options);
            const info = {
                count: result.totalDocs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage
                    ? `http://localhost:8080/products?page=${result.prevPage}`
                    : null,
                nextLink: result.hasNextPage
                    ? `http://localhost:8080/products?page=${result.nextPage}`
                    : null,
                payload: result.docs,
            };
            return { info };
        } catch (error) {
            return error;
        }
    }

    async findOneByCode(code) {
        try {
            const product = await productsModel.findOne({ code });
            return product;
        } catch (error) {
            throw error;
        }
    }
    async findMyProducts(ownerEmail){
        try {
            const products = await productsModel.find({ owner: ownerEmail }).lean();
            return products
        } catch (error) {
            throw error;
        }
    }
}

export const productManager = new ProductManager();