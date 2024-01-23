import { Router } from "express";
import { transporter } from "../nodemailer.js";
const router = Router();

router.get("/", async(req,res)=>{
    const messageOpt ={
        from: "Ecomerce",
        to: "migueltoar19@hotmail.com",
        subject: "Compra realizada con éxito",
        text: "Plaintext version of the message",
        // html: "<p>HTML version of the message</p>"
    };
    await transporter.sendMail(messageOpt)
    res.send("Mail send")
});

export default router