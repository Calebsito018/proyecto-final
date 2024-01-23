import { Router } from "express"
import accountController from "../controllers/account.controller.js";
import { getUserData } from "../middlewares/middlewares.js";
const router = Router();

router.post("/updateinfo", getUserData, accountController.updateinfo)
router.post ("/updatepassword", getUserData, accountController.updatePassword)
router.post("/deleteaccount", getUserData, accountController.deleteMyAccount)

export default router