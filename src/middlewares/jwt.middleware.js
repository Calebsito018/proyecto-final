import { generateToken } from "../utils.js";
import { userService } from "../services/users.service.js";

export const getUserByEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await userService.findByEmail(email);
        if (user) {
            const token = generateToken(user);
            req.userToken = token; // Almacena el token en req para su uso posterior
        } else {
            console.log('USUARIO NO ENCONTRADO');
        }
        next();
    } catch (error) {
        return res.status(500).json({ error });
    }
};