import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique: true,
        default: () => Math.random().toString(36).substring(2, 12).toUpperCase()
    },
    purchase_datetime:{
        type:Date,
        required:true,
        default: Date.now
    },
    amount:{
        type:Number,
        required:true
    },
    purchaser: {
        type : String,
        required:true
    },
    products:[{
        product: {
            type:String,
            required: true 
            // ref:'Products'
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],

})

export const ticketModel = mongoose.model('Ticket', ticketSchema)