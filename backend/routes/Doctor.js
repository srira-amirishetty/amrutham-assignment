const express = require('express');
const router = express.Router();
const auth = require('../controllers/doctor');

router.post('/doctor-register', auth.register);
router.post('/doctor-login', auth.login);
router.get('/doctors-get', auth.getDoctors);

module.exports = router;