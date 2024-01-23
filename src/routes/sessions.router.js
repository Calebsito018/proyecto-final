import { Router } from "express";
import SessionController from '../controllers/sessions.controller.js'

const router = Router();

router.post('/login', SessionController.login);
router.post('/register', SessionController.register);
router.get('/logout', SessionController.logout)

export default router;