import { Router } from "express";
import { checkSession, getUserData } from "../middlewares/middlewares.js";

const router = Router();

router.get("/",checkSession, getUserData, async (req, res) => {
    const isAdmin = res.locals.user && res.locals.user.role === 'admin';
    const nickName = res.locals.user.first_name || res.locals.user.name.split(' ')[0] || null //data para el nick
    try {
        res.render("chat", { messages: [], user:res.locals.user, onlyAdmin: isAdmin, nick: nickName });
    } catch (error) {
        return error;
    }
});

export default router;