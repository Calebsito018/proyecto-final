import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
    title:{
        type: 'string',
        required: true
    },
    description:{
        type: 'string',
        required: true,
    },
    price:{
        type: 'number',
        required: true,
    },
    stock:{
        type: 'number',
        required: true,
    },
    code:{
        type: 'string',
        required: true,
        unique: true
    },
    category:{
        type: "string",
        required: true,
    },
    status:{
        type: "boolean",
        default : true
    },
    quantity: {
        type: "number",
    },
    owner: {
        type: String,
        default: "admin"
    },
    thumbnails: [
        {
            type: String,
            required: true
        }
    ]
})

productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model("Products", productsSchema)