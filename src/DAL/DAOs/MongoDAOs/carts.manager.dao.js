import { cartModel } from '../../mongoDB/models/carts.model.js';
import BasicManager from './basic.manager.dao.js'
import loguer from '../../../winston.js';
import { productsModel } from '../../mongoDB/models/products.model.js';
import { ticketModel } from '../../mongoDB/models/ticket.js';

class CartsManager extends BasicManager {
    constructor() {
        super(cartModel, 'products.product');
    }
    async addProduct(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);
            if (!cart) {
                return loguer.error("Cart not found");
            }
            const productExists = cart.products.some(p => p.product.equals(pid));
            if (!productExists) {
                cart.products.push({ product: pid, quantity: 1 });
            } else {
                const product = cart.products.find(p => p.product.equals(pid));
                product.quantity++;
            }
            const updateCart = await cart.save();
            return updateCart;
        } catch (error) {
            return error;
        }
    }

    async updateCartProducts(cid, newProducts) {
        try {
            const cart = await cartModel.findById(cid);
            if (!cart) {
                throw new Error("Cart not found");
            }
            cart.products = newProducts;
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async updateQuantity(cartId, productId, newQuantity) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error("Cart not found");
            }
            const product = cart.products.find(productObj => productObj.product.toString() === productId);
            if (!product) {
                throw new Error("Product not found in the cart");
            }
            product.quantity = newQuantity;
            await cart.save();
            return cart;
        } catch (error) {
            return error;
        }
    }
    async delProduct(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);
            if (!cart) {
                throw new Error("Cart not found");
            }
            cart.products = cart.products.filter(product => !product.product.equals(pid));
            await cart.save();
            return cart;
        } catch (error) {
            return error;
        }
    }

    async purchase(cartId, userEmail) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                return { success: false, statusCode: 404, message: "Cart not found" };
            }
            const purchaseData = {
                purchaser: userEmail,
                purchase_datetime: new Date(),
                amount: 0,
                products: []
            };
            const productsNotPurchased = [];
            for (const product of cart.products) {
                const productDetails = await productsModel.findById(product.product._id);
                
                if (productDetails && productDetails.stock >= product.quantity) {
                    productDetails.stock -= product.quantity;
                    await productDetails.save();
                    purchaseData.amount += productDetails.price * product.quantity;
                    const productData = {
                        product: productDetails.title,
                        quantity: product.quantity,
                        price: productDetails.price
                    };
                    purchaseData.products.push({ ...productData });
                } else {
                    productsNotPurchased.push(product.product);
                    return { success: false, statusCode: 400, message: "Not enough stock available for this product.", product: productsNotPurchased}
                }
            }
            //dejo los productos que no se pudieron comprar en el carrito
            cart.products = productsNotPurchased;
            await cart.save();
            const ticket = new ticketModel(purchaseData);
            await ticket.save();
            return { success: true, ticket };
        } catch (error) {
            return error;
        }
    };
}

export const cartsManager = new CartsManager();