import { Router } from "express";
import viewController from '../controllers/views.controller.js'
import { getUserData, checkAdmin, publicAcces, privateAcces, blockAdminsMiddleware, manageProducts, checkAdminSession, checkRole, checkAndCreateCart, checkPremiumSession} from '../middlewares/middlewares.js'

const router = Router();

router.get('/', checkAdmin, getUserData, checkRole, viewController.staticProducts);
router.get('/realtimeproducts',checkAdminSession, manageProducts, getUserData, checkRole, viewController.realtimeproducts);
router.get('/product/:pid', viewController.viewProduct);
router.get('/view/products', getUserData, checkAndCreateCart, viewController.viewAllProducts),
router.get('/view/carts/:cid',privateAcces, getUserData, blockAdminsMiddleware, checkAndCreateCart, checkRole, viewController.viewOneCart);
router.get('/register', publicAcces, viewController.viewRegister);
router.get('/login', publicAcces, viewController.viewLogin);
router.get('/profile', privateAcces, getUserData, viewController.viewProfile);
router.get('/mockingproducts', viewController.mockingProducts);
router.get('/recoverpass', publicAcces, viewController.recoverPass)
router.get('/restorepassword', viewController.restorepassword);
router.post('/newpassword', viewController.newPassword)
router.get('/newproduct', getUserData, checkRole, manageProducts, viewController.newProduct)
router.get('/myproducts', getUserData, checkRole, manageProducts, viewController.myproducts)
router.get('/uploaddocuments', getUserData, checkRole, viewController.uploadDocuments)
router.get('/users-manager',checkAdminSession, getUserData, checkRole, viewController.manageUsers)
router.get('/purchase-detail/:ticketId', privateAcces, getUserData, checkRole, viewController.payData)

export default router
