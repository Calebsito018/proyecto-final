import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name:String,
    email:String,
    age:Number,
    password:String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart', // Referencia al modelo de Cart
        default:null
    },
    role:{
        type: String,
        enum: ['admin', 'premium', 'user'],
        default: "user"
    },
    documents: [
        {
            name: {
                type: String,
            },
            reference: {
                type: String,
            }
        }
    ],
    last_connection:{
        type: Date,
        default: Date.now
    }
})

export const userModel = mongoose.model('User', userSchema);