import { Router } from 'express';
import productController from '../controllers/products.controller.js';
import { manageProducts } from '../middlewares/middlewares.js';

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', manageProducts, productController.create);
router.put('/:id', productController.updateById);
router.delete('/:id', manageProducts, productController.deleteById);

export default router;