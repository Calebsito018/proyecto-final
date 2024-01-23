import { accountService } from "../services/account.services.js";
const updateinfo = async (req, res) => {
    const { firstName, lastName, email } = req.body
    if (!firstName & !lastName & !email) {
        return res.status(401).send({ message: "Data required" })
    }
    try {
        const obj = {
            firstName,
            lastName,
            email
        }
        const userId = res.locals.user._id
        const newDataUser = await accountService.updateInfoUser(userId, obj)
        return res.status(200).json({ message: "update success", newDataUser })
    } catch (error) {
        if (error.message === "Email already exist")
            res.status(500).json({ message: "Email already exist" });
        return res.status(500), send({ error })
    }
}
const updatePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body
    if (newPassword !== confirmPassword) {
        return res.send("La nueva contraseña no coincide")
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).send("All field are required")
    }
    try {
        const userId = res.locals.user._id
        const response = await accountService.updatePassword(userId, currentPassword, newPassword)
        return res.status(200).json({ message: "Password update success" })
    } catch (error) {
        if (error.message === "PASSWORDS_MUST_MATCH") {
            return res.status(500).send({ message: "La contraseña actual no coincide" })
        }
        return res.status(500).send({ error })
    }
}
const deleteMyAccount = async (req, res) => {
    try {
        const userId = res.locals.user._id
        const response = await accountService.deleteMyAccount(userId)
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send({ error: "Error al cerrar la sesión" });
            }
            return res.status(200).send({ message: "Cuenta eliminada y sesión cerrada con éxito" });
        });
    } catch (error) {
        return res.status(500).send({ error })
    }
}
export default {
    updateinfo,
    updatePassword,
    deleteMyAccount
}