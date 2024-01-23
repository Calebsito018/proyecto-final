import multer from 'multer';
import path from 'path';
import fs from "fs"
import { __dirname } from '../utils.js';

const projectRoot = path.resolve(__dirname, '..'); //ruta al directorio principal del proyecto

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.params.uid;
        const documentType = req.body.type;
        let destinationFolder = '';
        switch (documentType) {
            case 'profile':
                destinationFolder = 'profiles';
                break;
            case 'product':
                destinationFolder = 'products';
                break;
            case 'identification':
            case 'address_proof':
            case 'bank_statement':
                destinationFolder = path.join('documents', documentType);
                break;
            default:
                destinationFolder = 'uploads';
        }
        // Ruta al directorio uploads dentro de la carpeta src
        const uploadsFolder = path.join(projectRoot, 'src', 'uploads');
        // Ruta  de destino (dentro de uploads) para el usuario y tipo de documento
        const userFolder = path.join(uploadsFolder, destinationFolder, userId);
        // Crea las carpetas necesarias si no existen
        if (!fs.existsSync(uploadsFolder)) {
            fs.mkdirSync(uploadsFolder, { recursive: true });
        }
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }
        cb(null, userFolder);
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

export const upload = multer({ storage: storage });