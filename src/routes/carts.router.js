import { Router } from "express";
import CartController from '../controllers/carts.controller.js'
import { getUserData, checkAndCreateCart } from "../middlewares/middlewares.js";

const router = Router();

router.get('/', CartController.getAll);
router.get('/:cid', CartController.getById);
router.post('/', CartController.create);
router.put('/:cid', CartController.updateById);
router.delete('/:cid', CartController.deleteById);
router.post('/:cid/products/:pid', getUserData, CartController.addProdToCart);
router.put('/:cid/products/:pid', CartController.updProdToCart);
router.delete('/:cid/products/:pid', CartController.delProdToCart);
router.get('/:cid/purchase', getUserData, checkAndCreateCart, CartController.purchase)

export default router