import { userService } from '../services/users.service.js';
import UserDto from '../DAL/DTOs/users.dto.js';
import { cartService } from '../services/cart.services.js';

const getAll = async (req, res) => {
    try {
        const users = await userService.findAll();
        if(!users){
            return res.status(404).send({message: 'Users not found.'});
        }
        const usersDto = await users.map(user => new UserDto(user.first_name, user.last_name, user.email, user.role))
        return res.status(200).json({ message: 'All users retrieved successfully.', usersDto });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.findOne(id);
        if(!user){
            return res.status(404).send({message:'User not found'})
        }
        const userDto = new UserDto(user.first_name, user.last_name, user.email, user.role, user._id)
        return res.status(200).json({ message: 'User', userDto });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
const getByEmail = async (req, res) => {
    const { email } = req.body
    try {
        const user = await userService.findByEmail(email)
        if (!user) {
            return res.status(404).send("No existe un usuario con ese correo")
        } else {
            return res.status(200).send("Se enviaron las instrucciones para recuperar su contraseña a su correo electrónico")
        }
        // return res.status(200).json({message: "user", user})
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const create = async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await userService.createOne(userData);
        return res.status(200).json({ message: 'New User added', newUser });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const response = await userService.updateOne(id, userData);
        return res.status(200).json({ message: 'User updated successfully', response });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.findOne(id)
        if(!user){
            return res.status(400).json({message:'User not found'});
        }
        if(user.cart){
            await cartService.deleteOne(user.cart._id)
        }
        const response = await userService.deleteOne(id);
        return res.status(200).json({ message: 'User deleted successfully', response });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
const changeRole = async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await userService.findOne(uid);
        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }
        // obtengo un array con todas las referencias de los documentos subidos
        const documentReferences = user.documents.map(doc => doc.reference);
        // console.log("DOCUMENTACION", documentReferences);
        const oldRole = user.role;
        let newRole;
        if (oldRole === "user") {
            // verifico si todos los documentos requeridos estan presentes
            if (
                documentReferences.includes("identification") &&
                documentReferences.includes("address_proof") &&
                documentReferences.includes("bank_statement")
            ) {
                newRole = "premium";
            } else {
                return res.status(401).send("Unauthorized access. Please complete the required documentation to proceed.");
            }
        } else {
            newRole = "user";
        }
        const response = await userService.changeRole(newRole, uid);
        return res.status(200).json({ message: "User with new role", response });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const uploadDocument = async(req,res) =>{
    const {uid} = req.params
    try {
        const document = {
            name : req.file.filename,
            reference: req.body.type
        }
        const response = await userService.uploadDocumment(document, uid)
        return res.status(200).json({message: "done", response})
    } catch (error) {
        return res.status(500).json({ error });
    }
}
const deleteInactiveUsers = async(req,res) =>{
    try {
        const inactiveTime = 2 * 24 * 60 * 60 * 1000; //2dias en milisegundos
        const response = await userService.deleteInactiveUsers(inactiveTime)
        return res.status(200).json({message: `Cuentas inactivas eliminadas: ${response.deleteUsersResponse.deletedCount}`})
    } catch (error) {
        return res.status(500).json({ error });
    }
}
const changeRoleForAdmin = async(req, res)=>{
    const {uid} = req.params;
    const {newRole} = req.body;
    try {
        const newDataUser = await userService.changeRole(newRole, uid)
        return res.status(200).json({message: "Role changed successfully", newDataUser})
    } catch (error) {
        return res.status(500).json({ error });
    }
}
export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    getByEmail,
    changeRole,
    uploadDocument,
    deleteInactiveUsers,
    changeRoleForAdmin
}