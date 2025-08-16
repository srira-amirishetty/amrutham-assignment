const Appointment = require('../models/appointment');
const User = require('../models/users')
const { sendEmail } = require('../utils/Mailer');
const otpStore = {}

exports.CreateAppointment = async (req, res) => {
  const { doctorId, userId, date, timeSlot } = req.body;
  console.log("triggered in appointment")
  console.log(req.body)

  const exists = await Appointment.findOne({ doctor: doctorId, date, timeSlot, locked: false });
  if (exists) {
    return res.status(400).json({ message: 'Slot already booked' });
  }

  const appointment = new Appointment({
    doctor: doctorId,
    patient: userId,
    date,
    timeSlot,
    locked: true,
    lockExpiresAt: new Date(Date.now() + 5 * 60 * 1000)
  });

  await appointment.save();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Generated OTP for appointment: ${otp}`);
  otpStore[userId] = {otp,expires: Date.now() + 5 * 60 * 1000};

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await sendEmail(user.email, `Your OTP is: ${otp}`);
  res.status(200).json(appointment);
}

exports.verifyOtpAndBook = async (req, res) => {
  const {userId ,doctorId,date,timeSlot,otp} = req.body;

  const storedOtp = otpStore[userId];
  if (!storedOtp || storedOtp.otp !== otp || Date.now() > storedOtp.expires) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const appointment = await Appointment.findOneAndUpdate(
    { doctor: doctorId, patient: userId, date, timeSlot, locked: true },
    { locked: false, lockExpiresAt: null },
    { new: true }
  );

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found or already booked' });
  }

  delete otpStore[userId];
  res.status(200).json({ message: 'Appointment booked successfully', appointment });
};

exports.GetAppointments = async (req, res) => {
  const { doctorId, date } = req.query;
  console.log(doctorId)
  console.log(date)

  if (!doctorId || !date) {
    return res.status(400).json({ message: 'doctorId and date are required' });
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const appointments = await Appointment.find({
    doctor: doctorId,
    date: { $gte: startOfDay, $lte: endOfDay }
  }).select('timeSlot -_id');

  console.log(appointments)

  res.json(appointments.map(a => a.timeSlot));
};

exports.DeleteAppointment = async (req, res) => {
  try{
  const { doctorId, userId, date, timeSlot } = req.body;

  const currentTime = new Date();
  const appointmentTime = new Date(date);
  const [startHour] = timeSlot.split('-').map(Number);
  appointmentTime.setHours(startHour,0,0,0);

  const timeDiff = appointmentTime - currentTime;
  const isValidTime = timeDiff > 24 * 60 * 60 * 1000;

  if (!isValidTime) {
    return res.status(400).json({ message: 'You can only cancel appointments more than 24 hours in advance.' });
  }

  const appointment = await Appointment.findOneAndDelete({
    doctor: doctorId,
    patient: userId,
    date,
    timeSlot
  });

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  res.json({ success: true, message: 'Appointment deleted successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: 'Internal server error' });
}
};

exports.getMonthBookingStatus = async (req, res) => {
  const { doctorId, year, month } = req.query;
  console.log(doctorId, year, month)
  if (!doctorId || !year || !month) {
    return res.status(400).json({ message: "Missing params" });
  }

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const appointments = await Appointment.find({
    doctor: doctorId,
    date: { $gte: startDate, $lte: endDate }
  });

  const statusMap = {};
  appointments.forEach((appt) => {
    const dateStr = appt.date.toISOString().split("T")[0];
    statusMap[dateStr] = (statusMap[dateStr] || 0) + 1;
  });

  const result = [];
  for (let day = 1; day <= endDate.getDate(); day++) {
    const date = new Date(year, month - 1, day);
    const dateStr = date.toISOString().split("T")[0];
    const count = statusMap[dateStr] || 0;

    let status = "white";
    if (count === 1) status = "yellow";
    else if (count === 2) status = "orange";
    else if (count === 3) status = "brown";
    else if (count >= 4) status = "red";

    result.push({ date: dateStr, status });
  }

  res.json(result);
};

exports.getAppointmentsByUserId = async (req, res) => {
  try{
    const {userId} = req.params
    if (!userId){
      return res.status(400).json({ message: "Missing userId" });
    }
    console.log(userId)

    const appointments = await Appointment.find({
    patient: userId,
    }).populate("doctor", "username")
      .populate("patient", "username")
      .exec();

    res.status(200).json(appointments);
  }catch(error){
  console.error(error);
  res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

exports.getAppointmentsByDoctorId = async (req, res) => {
  try{
    const {doctorId} = req.params
    if (!doctorId){
      return res.status(400).json({ message: "Missing doctorId" });
    }
    console.log(doctorId)

    const appointments = await Appointment.find({doctor: doctorId})
       .populate("doctor", "username")
       .populate("patient", "username")
       .exec();

    res.status(200).json(appointments);
  }catch(err){
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
  }
