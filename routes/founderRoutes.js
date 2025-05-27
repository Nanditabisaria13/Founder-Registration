// routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const founderController = require('../controllers/founderController');
const formValidator = require('../middleware/formValidator');

// === File upload setup ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// === Routes ===
router.get('/', (req, res) => {
  res.render('index', { errors: [], formData: {}, success: '', submissions: [] });
});

router.post('/submit', upload.single('image'), formValidator,founderController.submitForm);

router.get('/success', founderController.getSuccessPage);

module.exports = router;
