const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  timeSlot: { 
    type: String, // e.g. "12-01"
    required: true 
  },
  locked: { type: Boolean, default: false },
  lockExpiresAt: { type: Date }

});

module.exports = mongoose.model('Appointment', appointmentSchema);
