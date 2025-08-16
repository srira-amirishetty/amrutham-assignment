const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


const authRoutes = require('./routes/auth');
const doctorAuthRoutes = require('./routes/Doctor')
const categoryRoutes = require('./routes/categories');
const appointmentRoutes = require('./routes/appointment')

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://amrutham-assignment.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.options("*", cors());
app.use(express.json());

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.use('/auth', authRoutes);
app.use('/auth', doctorAuthRoutes);
app.use('/',categoryRoutes)
app.use('/',appointmentRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});