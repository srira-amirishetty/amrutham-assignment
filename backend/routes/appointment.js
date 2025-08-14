const express = require('express');
const router = express.Router();
const appointments = require('../controllers/appointment');

router.post('/create-appointment',appointments.CreateAppointment);
router.get('/getAllAppointments',appointments.GetAppointments);
router.delete('/delete-appointment', appointments.DeleteAppointment);

module.exports = router;