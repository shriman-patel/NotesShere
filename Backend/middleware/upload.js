const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // नोट्स को 'uploads' फ़ोल्डर में सेव करें (यह फ़ोल्डर सर्वर रूट में होना चाहिए)
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // फ़ाइल का नाम अद्वितीय (unique) और सुरक्षित रखें
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// फ़ाइल फ़िल्टर (केवल PDF और Image फ़ाइलें स्वीकार करें)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// 5MB की सीमा के साथ अपलोड ऑब्जेक्ट बनाएँ
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
    fileFilter: fileFilter
});

module.exports = upload;