const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const sendOTP = (email,otp)=>{
  console.log(`Sending OTP ${otp} to ${email} (mock)`)
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role });
    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, otp, useOtp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (useOtp) {
      
      if (!otp) return res.status(400).json({ message: "OTP required" });

      if (user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(401).json({ message: "Invalid or expired OTP" });
      }
      user.otp = null;
      user.otpExpires = null;
      await user.save();
    } else {
      
      if (!password) return res.status(400).json({ message: "Password required" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 mins
    await user.save();

    sendOTP(email, otp);
    res.json({ message: "OTP sent (mocked)" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};