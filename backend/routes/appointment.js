const express = require('express');
const router = express.Router();
const appointments = require('../controllers/appointment');
const authenticateJWT = require('../middlewares/jwt');

router.post('/create-appointment',authenticateJWT,appointments.CreateAppointment);
router.get('/getAllAppointments',authenticateJWT,appointments.GetAppointments);
router.delete('/delete-appointment',authenticateJWT, appointments.DeleteAppointment);
router.post('/verify-otp',authenticateJWT, appointments.verifyOtpAndBook);
router.get('/getMonthStatus',authenticateJWT,appointments.getMonthBookingStatus)
router.get('/getAppointmentsByUserId/:userId',authenticateJWT,appointments.getAppointmentsByUserId)
router.get('/getAppointmentsByDoctorId/:doctorId',appointments.getAppointmentsByDoctorId)

module.exports = router;