const express = require('express');

const router = express.Router();
const { createUser } = require('../controllers/userControllers');
const { validateUserRegistration, userValidation } = require('../middlewares/validation/userValidation');

// Making post request
router.post('/create-user', validateUserRegistration, userValidation, createUser);

module.exports = router;
