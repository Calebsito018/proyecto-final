import { userManager } from "../DAL/DAOs/MongoDAOs/users.manager.dao.js";
import { hashData } from "../utils.js";
import { cartModel } from '../DAL/mongoDB/models/carts.model.js'
import config from "../config/config.js";
import { transporter } from "../nodemailer.js";
import { userModel } from "../DAL/mongoDB/models/users.model.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send("Please enter all fields");
    }
    try {
        if (email === config.admin_email && password === config.admin_password) {
            req.session.user = {
                name: "Coder Admin",
                email: config.admin_email,
                role: "admin",
            }
            return res.send({ status: "success", message: "Logeo exitoso" });
        } else {
            const authResult = await userManager.authenticateUser(email, password);
            if (authResult.success) {
                const { user } = authResult;
                const userCart = await cartModel.findOne({ user: user._id });
                if (userCart) {
                    req.session.user = {
                        _id: user._id,
                        name: `${user.first_name} ${user.last_name}`,
                        email: user.email,
                        role: user.role,
                        cart: userCart._id,
                    }
                    // agrego el id del carrito al modelo de usuarios y guardo en la db
                    user.cart = userCart._id
                    await user.save()
                    await userModel.findByIdAndUpdate(user._id, { last_connection: new Date() });
                    
                }else{
                    const newCart = new cartModel({
                        user: user._id,
                        products: []
                    })
                    await newCart.save();
                    req.session.user = {
                        _id: user._id,
                        name: `${user.first_name} ${user.last_name}`,
                        email: user.email,
                        role: user.role,
                        cart: newCart._id,
                    }
                    user.cart = newCart._id
                    await user.save()
                    await userModel.findByIdAndUpdate(user._id, { last_connection: new Date() });
                }
                return res.status(200).json({ status: 'success', message: 'Successful login' });
            } else {
                return res.status(400).json({ status: 'error', error: "Incorrect credentials" });
            }
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).send({ message: "All fields are required" })
    }
    try {
        const exist = await userManager.findUserByEmail(email);
        if (exist) {
            return res.status(400).send({ status: "error", error: "User already exists" });
        }
        const hashPassword = await hashData(password);
        const newUser = await userManager.createOne({ ...req.body, password: hashPassword });
        const htmlContent = `
        <h1>Bienvenido ${first_name} ${last_name}</h1>
        <p>Usted ha sido satisfactoriamente registrado(a) en nuestra tienda en línea</p>`
        const message = {
            from: "Ecomerce",
            to: newUser.email,
            subject: "Registro exitoso",
            html: htmlContent
        };
        await transporter.sendMail(message)
        return res.status(200).send({
            status: "succes",
            message: "User registered",
            user: newUser
        })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const logout = async (req, res) => {
    const userId = req.user ? req.user.id : req.session.user._id
    await userModel.findByIdAndUpdate(userId, { last_connection: new Date() });
    req.session.destroy(err => {
        if (err) return res.status(500).send({
            status: "error", error: "Error al  cerrar sesion"
        })
        res.redirect('/login');
    })
}

export default {
    login, register, logout
}