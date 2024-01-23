import { productService } from "../services/products.service.js";
import { userService } from "../services/users.service.js";
import { cartService } from "../services/cart.services.js";
import { generateProduct } from "../mocks.js";
import config from "../config/config.js"
import jwt from "jsonwebtoken"
import UserDto from "../DAL/DTOs/users.dto.js";
import { formatDate } from "../utils.js";
import { ticketModel } from "../DAL/mongoDB/models/ticket.js";

const staticProducts = async (req, res) => {
    const limit = req.query.limit;
    if (limit && isNaN(limit) || limit <= 0) {
        return res.send({ message: "Invalid limit. Must be an integer" });
    }
    try {
        const { info } = await productService.findAll({ limit });
        if (!info.payload.length) {
            return res.status(404).send({ message: "Products not found" });
        }
        res.render("home", {
            products: info.payload,
            user: res.locals.user,
            onlyAdmin: res.locals.isAdmin
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const realtimeproducts = async (req, res) => {
    try {
        const { info } = await productService.findAll({});
        if (!info.payload.length) {
            return res.status(404).send({ message: "Real-time Products not found" });
        }
        res.render("realTimeProducts", {
            pagination: info,
            products: info.payload,
            user: res.locals.user,
            onlyAdmin: res.locals.isAdmin,
            isPremium: res.locals.isPremium
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const viewProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productService.findById(pid);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        };
        res.status(200).render("home", { product });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const viewAllProducts = async (req, res) => {
    const cartIdUser = req.session.user ? req.session.user.cart : (res.locals.user ? res.locals.user.cart : null);
    const page = req.query.page || 1;
    const limit = 8;
    try {
        const productsData = await productService.findAll({ page, limit });
        const isAdmin = res.locals.user && res.locals.user.role === 'admin';
        const premiumRole = res.locals.user && res.locals.user.role === 'premium';
        return res.render('productsView', {
            products: productsData.info.payload,
            pagination: productsData.info,
            user: res.locals.user,
            cartId: cartIdUser,
            onlyAdmin: isAdmin,
            isPremium: premiumRole
        });
    } catch (error) {
        res.status(500).send({ error });
    }
}

const viewOneCart = async (req, res) => {
    const { cid } = req.params;
    if (!cid) {
        res.status(400).send({ message: "Cart ID not found" })
    }
    try {
        const cart = await cartService.findOne(cid);
        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        const cartData = []
        for (const productData of cart.products) {
            const { title, price, stock } = productData.product;
            const { quantity, _id } = productData
            const totalCalc = price * quantity
            cartData.push({ title, price, stock, totalCalc, quantity, _id })
        }
        let sumaTotal = 0;
        for (let i = 0; i < cartData.length; i++) {
            sumaTotal += cartData[i].totalCalc
        }
        res.render("cartView", {
            cart: cart,
            total: sumaTotal.toLocaleString('en-US'),
            user: res.locals.user,
            onlyAdmin: res.locals.isAdmin,
            isPremium: res.locals.isPremium
        });
    } catch (error) {
        console.error("Error en viewOneCart:", error);
        res.status(500).send({ error: error.message || "Internal Server Error" });
    }
}
const viewRegister = (req, res) => {
    try {
        res.render('register')
    } catch (error) {
        res.status(500).send({ error });
    }
}
const viewLogin = (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        res.status(500).send({ error });
    }
}
const viewProfile = (req, res) => {
    const isAdmin = res.locals.user && res.locals.user.role === 'admin';
    const premiumRole = res.locals.user && res.locals.user.role === 'premium';
    try {
        res.render('profile', {
            user: res.locals.user,
            onlyAdmin: isAdmin,
            isPremium: premiumRole
        })
    } catch (error) {
        res.status(500).send({ error });
    }
}
const mockingProducts = (req, res) => {
    const products = [];
    for (let i = 1; i <= 100; i++) {
        const product = generateProduct();
        products.push(product);
    }
    // res.json(products);
    try {
        res.render("home", { products: products });
    } catch (error) {
        res.status(500).json({ error });
    }
}
const recoverPass = (req, res) => {
    try {
        res.render("recoverPass")
    } catch (error) {
        res.status(500).json({ error });
    }
}
const restorepassword = (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).send('Token inválido o faltante');
    }
    try {
        const decoded = jwt.verify(token, config.jwt_secret_key,);
        if (decoded) {
            // Verifica que el token no haya caducado
            if (decoded.exp * 1000 > Date.now()) {
                res.render("restorePassword", { token });
            }
        }
    } catch (error) {
        if (error.message == "jwt expired") {
            res.render("expiredToken")
        }
    }
}
const newPassword = async (req, res) => {
    const { token } = req.body
    try {
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        if (newPassword !== confirmPassword) {
            return res.status(400).send('Las contraseñas no coinciden');
        }
        await userService.newPassword(newPassword, token)
        return res.render("login")
    } catch (error) {
        if (error.message === "PASSWORDS_MUST_NOT_MATCH") {
            return res.send("No puedes ingresar una contraseña anterior")
        }
        res.status(500).json({ error });
    }
}
const newProduct = async (req, res) => {
    try {
        res.render("roleProducts", {
            user: res.locals.user,
            onlyAdmin: res.locals.isAdmin,
            isPremium: res.locals.isPremium
        })
    } catch (error) {
        res.status(500).json({ error });
    }
}
const myproducts = async (req, res) => {
    const sessionUserEmail = req.session.user.email;
    try {
        const products = await productService.findMyProducts(sessionUserEmail);
        res.render("myProducts", {
            products,
            user: res.locals.user,
            onlyAdmin: res.locals.isAdmin,
            isPremium: res.locals.isPremium
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};
const uploadDocuments = async (req, res) => {
    const uid = res.locals.user._id
    try {
        res.render("documents", { uid })
    } catch (error) {
        res.status(500).json({ error });
    }
}
const manageUsers = async (req, res) => {
    try {
        const users = await userService.findAll()
        const usersDto = await users.map(user => new UserDto(user.first_name, user.last_name, user.email, user.role, user._id, formatDate(user.last_connection)))
        res.render("manageUsers", {
            users: usersDto,
            user: res.locals.user,
            onlyAdmin: res.locals.isAdmin,
            isPremium: res.locals.isPremium
        })
    } catch (error) {
        res.status(500).json({ error });
    }
}
const payData = async(req, res) =>{
    try {
        const {ticketId} = req.params
        const response = await ticketModel.findById(ticketId)
        const purchaseData = {
            time: formatDate(response.purchase_datetime),
            code: response.code,
            amount: response.amount,
            purchaser: response.purchaser
        }
        const products = []
        for (const product of response.products) {
            const newProductData = {
                quantity: product.quantity,
                price: product.price,
                product: product.product,
                totalUnit: product.price * product.quantity
            }
            products.push(newProductData)
            
        }
        res.render("payData", {purchaseData, products})
    } catch (error) {
        res.status(500).json({ error });
    }
}

export default {
    staticProducts,
    realtimeproducts,
    viewProduct,
    viewAllProducts,
    viewOneCart,
    viewRegister,
    viewLogin,
    viewProfile,
    mockingProducts,
    restorepassword,
    recoverPass,
    newPassword,
    newProduct,
    myproducts,
    uploadDocuments,
    manageUsers,
    payData
}