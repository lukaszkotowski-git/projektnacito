const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '../../uploads');
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024;

const ALLOWED_MIMETYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dateFolder = new Date().toISOString().split('T')[0];
        const destPath = path.join(UPLOAD_DIR, dateFolder);
        
        if (!fs.existsSync(destPath)) {
            try {
                fs.mkdirSync(destPath, { recursive: true });
            } catch (err) {
                console.error('Failed to create upload directory:', err);
                return cb(new Error('Nie można utworzyć katalogu upload (uprawnienia).'));
            }
        }
        
        cb(null, destPath);
    },
    filename: (req, file, cb) => {
        const uniqueId = crypto.randomBytes(16).toString('hex');
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueId}${ext}`);
    },
});

function fileFilter(req, file, cb) {
    if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Niedozwolony typ pliku. Dozwolone: JPG, PNG, GIF, WebP, PDF, DOC, DOCX'), false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
});

module.exports = {
    upload,
    UPLOAD_DIR,
};
