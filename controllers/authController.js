const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '365d',
    });

    res.json({
      message: 'Login successful',
      token,
      username: user.username,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get user data by token
exports.getUserDataByToken = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.json({
      message: 'Login successful',
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        email: user.email,
      },
    });

    return {};
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserDataByToken = async (req, res) => {
  try {
    const { token, userData } = req.body;

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (userData.name) user.name = userData.name;
    if (userData.phone) user.phone = userData.phone;

    await user.save();

    res.json({
      message: 'User data updated successfully',
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: error.message });
  }
};
