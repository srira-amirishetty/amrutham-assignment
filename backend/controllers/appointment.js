const Appointment = require('../models/appointment');

exports.CreateAppointment = async (req, res) => {
  const { doctorId, userId, date, timeSlot } = req.body;
  console.log("triggered in appointment")
  console.log(req.body)

  const exists = await Appointment.findOne({ doctor: doctorId, date, timeSlot });
  if (exists) {
    return res.status(400).json({ message: 'Slot already booked' });
  }

  const appointment = new Appointment({
    doctor: doctorId,
    patient: userId,
    date,
    timeSlot
  });

  await appointment.save();
  res.status(201).json(appointment);
}

exports.GetAppointments    =  async (req, res) => {
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
    console.log(req.body)
  const { doctorId, userId, date, timeSlot } = req.body;

  const appointment = await Appointment.findOneAndDelete({
    doctor: doctorId,
    patient: userId,
    date,
    timeSlot
  });

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  res.json({ message: 'Appointment deleted successfully' });
};
