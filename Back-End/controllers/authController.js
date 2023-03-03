const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    // check if user with same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new user
    const newUser = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role: 1,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // create and sign JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // set cookie with JWT
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// logout a user
exports.logoutUser = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
};
