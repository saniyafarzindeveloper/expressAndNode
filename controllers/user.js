//no of models = no of controller

import { User } from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne(email);
    if (user) {
      return res.status(403).json({
        success: false,
        message: "Email ID already taken",
      });
    }

    await User.create({
        fullName, email, password
    });
    return res.status(201).json({
        success: true,
        message: "Account created successfullly",
    })
  } catch (error) {}
};
