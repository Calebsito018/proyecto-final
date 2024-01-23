import { userModel } from '../../mongoDB/models/users.model.js';
import { compareData } from '../../../utils.js'
import BasicManager from './basic.manager.dao.js';
import { cartModel } from '../../mongoDB/models/carts.model.js';

class UserManager extends BasicManager{
    constructor(){
        super(userModel, 'cart')
    }
    async findUserByEmail(email){
        try {
            const user = await userModel.findOne({email})
            return user
        } catch (error) {
            return error
        }
    }
    async authenticateUser(email, password){
        try {
            const user = await this.findUserByEmail(email);
            if (!user) {
                return { success: false, message: 'Incorrect credentials' };
            }
            const isPasswordValid = await compareData(password, user.password);
            if (!isPasswordValid) {
                return { success: false, message: 'Username or password not valid' };
            }
            return { success: true, user };
        } catch (error) {
            return { success: false, message: 'An error occurred during authentication' };
        }
    }
    async deleteUserByEmail(email){
        try {
            const deletedUser = await userModel.findOneAndDelete({email});
            if (!deletedUser) {
                return res.status(400).send({message: "User not found"});
            }
            return deletedUser;
        } catch (error) {
            return error
        }
    }
    async updatePassword (uid, newPassword){
        try {
            const user = await userModel.findById(uid);
            if(!user){
                throw Error('No such user');
            }
            user.password = newPassword;
            await user.save();
            console.log("USER", user);
            return user
        } catch (error) {
            return error
        }
    }
    async updateRole(role, uid){
        try {
            const user = await userModel.findById(uid);
            user.role = role
            await user.save()
            return user
            
        } catch (error) {
            return error
        }
    }
    async updateinfo(uid, obj){
        try {
            const user = await userModel.findById(uid)
            const newFirstName = obj.firstName ? obj.firstName : user.first_name
            const newLastName = obj.lastName ? obj.lastName : user.last_name
            const newEmail = obj.email ? obj.email: user.email
            user.first_name = newFirstName
            user.last_name = newLastName
            user.email = newEmail
            await user.save()
            return user
        } catch (error) {
            return error
        }
    }
    async uploadDocumment(document, uid){
        try {
            const user = await userModel.findById(uid)
            user.documents.push(document)
            await user.save()
            return 
        } catch (error) {
            return error
        }
    }
    async deleteInactiveUsers(inactiveTime){
        const currentDate = new Date();
        const limitDate = new Date(currentDate - inactiveTime);
        try {
            const usersToDelete = await userModel.find({ last_connection: { $lt: limitDate } });
            const usersIdsToDelete = usersToDelete.map(user => user._id);
            const emailUsers = usersToDelete.map(user => user.email)

            const deleteUsersResponse = await userModel.deleteMany({ last_connection: { $lt: limitDate } });
            const deleteCartsResponse = await cartModel.deleteMany({ user: { $in: usersIdsToDelete } });
            return {deleteUsersResponse, emailUsers}
        } catch (error) {
            return error
        }
    }

}
export const userManager = new UserManager()