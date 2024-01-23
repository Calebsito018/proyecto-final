import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user:{
        type: 'string',
        required: true,
    },
    message:{
        type: 'string',
        required: true,
    }
})

const messagesModel = mongoose.model("message", messageSchema);

export default messagesModel;