import { productManager } from '../DAL/DAOs/MongoDAOs/products.manager.dao.js';
import { transporter } from '../nodemailer.js';

class ProductService {
    async findAll(query) {
        try {
            const products = await productManager.findAll(query);
            return products;
        } catch (error) {
            return error
        }
    }

    async findById(id) {
        try {
            const product = await productManager.findById(id);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async createOne(productData) {
        try {
            const newProduct = await productManager.createOne(productData);
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async updateOne(id, productData) {
        try {
            const response = await productManager.updateOne(id, productData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(id) {
        try {
            const product = await productManager.findById(id)
            if(product.owner && product.owner !== "admin"){
                const htmlContent = `
                    <p>Tu producto "${product.title}" fué eliminado.</p>`
                    const message = {
                        from: "Ecomerce",
                        to: product.owner,
                        subject: "Producto eliminado",
                        html: htmlContent
                    };
                    await transporter.sendMail(message)
            }
            const response = await productManager.deleteOne(id);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async findOneByCode(code) {
        try {
            const product = await productManager.findOneByCode(code);
            return product;
        } catch (error) {
            throw error;
        }
    }
    async findMyProducts(ownerEmail){
        try {
            const products = await productManager.findMyProducts(ownerEmail);
            return products;
        } catch (error) {
            throw error;
        }
    }
}

export const productService = new ProductService();
