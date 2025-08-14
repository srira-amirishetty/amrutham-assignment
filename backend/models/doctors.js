const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  username: { type: String, required: true, },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  specialization: { type: String, required: true }
});

module.exports = mongoose.model('Doctor', DoctorSchema);