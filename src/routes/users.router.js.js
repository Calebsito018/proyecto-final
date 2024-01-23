import { Router } from "express";
import passport from "passport";
import usersController from "../controllers/users.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.get('/githubSignup',passport.authenticate('github', { scope: [ 'user:email' ] }))
router.get('/github',passport.authenticate('github',{ 
    failureRedirect: '/login',
    successRedirect: "/view/products"
    }),
)

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
// router.put('/:id', usersController.updateById);
router.delete('/', usersController.deleteInactiveUsers)
router.post('/:email', usersController.getByEmail);
router.post('/premiun/:uid', usersController.changeRole)
router.post('/:uid/documents', upload.single("document"), usersController.uploadDocument)
router.delete('/:id', usersController.deleteById)
router.post('/change-role/:uid', usersController.changeRoleForAdmin)


export default router;