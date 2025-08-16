const express = require('express');
const router = express.Router();
const appointments = require('../controllers/appointment');

router.post('/create-appointment',appointments.CreateAppointment);
router.get('/getAllAppointments',appointments.GetAppointments);
router.delete('/delete-appointment', appointments.DeleteAppointment);
router.post('/verify-otp', appointments.verifyOtpAndBook);
router.get('/getMonthStatus',appointments.getMonthBookingStatus)
router.get('/getAppointmentsByUserId/:id',appointments.getAppointmentsByUserId)

module.exports = router;