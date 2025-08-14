const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctors');

exports.register = async (req, res) => {
  const { username, password, email, role,specialization } = req.body;
  if (!username || !password || !email || !role || !specialization) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await Doctor.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Doctor already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new Doctor({ username, password: hashedPassword, email, role,specialization});
  await user.save();

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.status(201).json({ token,user });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await Doctor.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.status(200).json({ token, role: user.role, user });
};

exports.getDoctors = async (req, res) => {
  try {
    const limit = 12;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const filter = req.query.category || ""

    let query ={}

    if (search){
        query.username = { $regex: search, $options: 'i' }
    }
    if (filter){
        query.specialization = filter
    }

    console.log(limit,page,search,filter)

    const total = await Doctor.countDocuments(query); 

    const doctors = await Doctor.find(query).skip((page-1)*limit).limit(limit);
    
    res.status(201).json({data:doctors,page,totalPages: Math.ceil(total/limit) });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

