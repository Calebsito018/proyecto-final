import { userManager } from "../DAL/DAOs/MongoDAOs/users.manager.dao.js"
import bcrypt from "bcrypt"
import { hashData } from "../utils.js"
import { cartsManager } from "../DAL/DAOs/MongoDAOs/carts.manager.dao.js"
import { cartModel } from "../DAL/mongoDB/models/carts.model.js"

class AccountService {
    async updateInfoUser(uid, obj) {
        try {
            const emailExist = await userManager.findUserByEmail(obj.email)
            if (emailExist) {
                throw new Error("Email already exist")
            }
            const response = await userManager.updateinfo(uid, obj)
            return response
        } catch (error) {
            throw error;
        }
    }
    async updatePassword(uid, password, newPassword) {
        try {
            const user = await userManager.findById(uid)
            const checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) {
                throw new Error("PASSWORDS_MUST_MATCH")
            }
            const hashNewPassword = await hashData(newPassword)
            const response = await userManager.updatePassword(uid, hashNewPassword)
            return response
        } catch (error) {
            throw error;
        }
    }
    async deleteMyAccount(uid) {
        try {
            const findCartUser = await cartModel.findOne({ user: uid })
            const cartUser = await cartsManager.deleteOne(findCartUser._id)
            const response = await userManager.deleteOne(uid)
            return response
        } catch (error) {
            throw error;
        }
    }
}
export const accountService = new AccountService()