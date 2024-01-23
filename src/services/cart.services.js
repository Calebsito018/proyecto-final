import { cartsManager } from "../DAL/DAOs/MongoDAOs/carts.manager.dao.js";

class CartService{
    async findAll(){
        try {
            const response = await cartsManager.findAll();
            return response
        } catch (error) {
            throw error;
        }
    }
    async findOne(cid){
        try {
            const response = await cartsManager.findById(cid)
            return response
        } catch (error) {
            throw error;
        }
    }
    async createOne(cartData){
        try {
            const response = await cartsManager.createOne(cartData)
            return response
        } catch (error) {
            throw error;
        }
    }

    async updateOne(cid, products){
        try {
            const response = await cartsManager.updateCartProducts(cid, products);
            return response
        } catch (error) {
            
        }

    }
    async deleteOne(cid){
        try {
            const response = await cartsManager.deleteOne(cid)
            return response
        } catch (error) {
            throw error;
        }
    }
    
    async addProduct(cid, pid){
        try {
            const response = await cartsManager.addProduct(cid, pid);
            return response
        } catch (error) {
            throw error;
        }
    }
    async updateQuantity(cid, pid, quantity){
        try {
            const response = await cartsManager.updateQuantity(cid, pid, quantity);
            return response
        } catch (error) {
            throw error;
        }
    }
    async delProduct(cid, pid){
        try {
            const response = await cartsManager.delProduct(cid, pid);
            return response
        } catch (error) {
            throw error;
        }
    }

    async purchaseCart(cartId, userEmail) {
        try {
            const response = await cartsManager.purchase(cartId, userEmail);
            return response;
        } catch (error) {
            throw error;
        }
    };
    
}

export const cartService = new CartService();