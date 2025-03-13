//no of models = no of controller

import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "Email ID already taken",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10); //10 rounds or 10 salts
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Account created successfullly",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "No user found. Incorrect email or pw",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password); //returns a boolean value

    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Logged in successfullly. Welcome back ${user.fullName}`,
      });
  } catch (error) {}
};
