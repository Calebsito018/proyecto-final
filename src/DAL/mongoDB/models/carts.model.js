import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products', // Referencia al modelo de Products
                required: true,
            },
            quantity: {
                type: mongoose.Schema.Types.Number,
                required: true,
                default: 1,
            },
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo de User
        required: true,
    }
});

export const cartModel = mongoose.model('Cart', cartSchema);
