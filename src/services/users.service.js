import { userManager } from '../DAL/DAOs/MongoDAOs/users.manager.dao.js';
import { hashData, compareData } from '../utils.js';
import { generateToken, decodedToken } from '../utils.js';
import { transporter } from '../nodemailer.js';
import bcrypt from "bcrypt"
import config from '../config/config.js';

class UserService {
    async findAll() {
        try {
            const users = await userManager.findAll();
            return users;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id) {
        try {
            const user = await userManager.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
    async findByEmail(email) {
        try {
            const user = await userManager.findUserByEmail(email);
            const token = generateToken(user);
            if (user) {
                const htmlContent = `
                <h1>Recupera el acceso a tu cuenta</h1>
                <p>Usted ha generado un enlace para recuperar el acceso a su cuenta, el siguiente enlace sólo es válido durante una hora</p>
                <a href="${config.domain}/restorepassword?token=${token}">Generar nueva contraseña</a>`
                // <a href="http://localhost:8080/restorepassword?token=${token}">Generar nueva contraseña</a>`

                const message = {
                    from: "Ecomerce",
                    to: email,
                    subject: "Recuperación de contraseña",
                    html: htmlContent
                };
                await transporter.sendMail(message)
            }
            return user
        } catch (error) {
            throw error;
        }
    }

    async createOne(userData) {
        try {
            const passwordIsValid = await compareData(userData.password, userData.confirmPassword);
            if (!passwordIsValid) {
                throw new Error('Passwords do not match');
            }
            const newUser = await userManager.createOne(userData);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async updateOne(id, userData) {
        try {
            if (userData.password) {
                const passwordIsValid = await compareData(userData.password, userData.confirmPassword);
                if (!passwordIsValid) {
                    throw new Error('Passwords do not match');
                }
            }

            const response = await userManager.updateOne(id, userData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(uid) {
        try {
            const response = await userManager.deleteOne(uid);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async newPassword(password, token) {
        try {
            const userData = await decodedToken(token)
            const uid = userData.user._id
            const userDb = await userManager.findById(uid)
            const hashNewPass = await hashData(password)
            const comparePass = await bcrypt.compare(password, userDb.password);
            if (comparePass) {
                console.log("Passwords must not match. Try again.");
                throw new Error("PASSWORDS_MUST_NOT_MATCH")
            }
            const updatePassword = await userManager.updatePassword(uid, hashNewPass)
            return updatePassword
        } catch (error) {
            throw error;
        }
    }
    async changeRole(role, uid) {
        try {
            const response = await userManager.updateRole(role, uid)
            return response
        } catch (error) {
            throw error;
        }

    }
    async uploadDocumment(document, uid) {
        try {
            const response = await userManager.uploadDocumment(document, uid)
            return response
        } catch (error) {
            throw error;
        }
    }
    async deleteInactiveUsers(inactiveTime) {
        try {
            const response = await userManager.deleteInactiveUsers(inactiveTime)
            if(response.emailUsers.length){
                for (const email of response.emailUsers) {
                    const htmlContent = `
                    <p>Tu cuenta ha sido eliminada por inactividad</p>`
                    const message = {
                        from: "Ecomerce",
                        to: email,
                        subject: "Cuenta eliminada",
                        html: htmlContent
                    };
                    await transporter.sendMail(message)
                }
            }
            return response
        } catch (error) {
            throw error;
        }
    }
}

export const userService = new UserService();