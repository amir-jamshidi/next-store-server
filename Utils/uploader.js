import path from 'path'
import multer from 'multer'

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sliderStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '/public/media/sliders'))
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + String(Math.floor(Math.random() * 100000))
        const ext = path.extname(file.originalname);
        cb(null, filename + ext)
    }
})
