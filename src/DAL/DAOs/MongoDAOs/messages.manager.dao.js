import {messagesModel} from '../../mongoDB/models/messages.model.js'
import BasicManager from './basic.manager.dao.js'

class MessagesManager extends BasicManager{
    constructor(){
        super(messagesModel);
    }
}

export const messagesManager = new MessagesManager();