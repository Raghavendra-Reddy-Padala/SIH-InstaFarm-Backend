const farmerController = require('../controllers/farmerController');
const express = require('express');

const router = express.Router();

router.post('/register', farmerController.farmerRegister);
router.post('/login', farmerController.farmerLogin);
router.get('/all-farmers',farmerController.getAllFarmers);
router.get('/single-farmer/:id',farmerController.getfarmerbyId);

module.exports = router;
