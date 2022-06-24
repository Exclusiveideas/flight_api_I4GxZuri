const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

// 1. Add/Book Flight
router.post('/add', controller.addFlight);

// 2. Get all Flight
router.get('/getAll', controller.getAllFlights)

// 3. Get a single Flight
router.get('/get', controller.getFlight)

// 4. Update/Edit Flight
router.patch('/update', controller.updateFlight)

// 5. Delete Flight
router.delete('/delete', controller.deleteFlight)


module.exports = router;

