import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerCtrl = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) return res.send({ message: "Name is required" });
    if (!email) return res.send({ message: "Email is required" });
    if (!password) return res.send({ message: "Password is required" });
    if (!phone) return res.send({ message: "Phone is required" });
    if (!address) return res.send({ message: "Address is required" });
    if (!answer) return res.send({ message: "Answer is required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    await newUser.save();
    return res.status(201).send({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while registering user",
      error,
    });
  }
};

export const loginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.send("Email or password is required");

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "User does not exist",
      });
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect)
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Loging user",
      error,
    });
  }
};

// forget

export const forgotPasswordCtrl = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!answer) return res.status(400).send({ message: "Answer is required" });
    if (!newPassword)
      return res.status(400).send({ message: "New Password is required" });

    const user = await User.findOne({ email, answer });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "User does not exist",
      });

    const hashingPassword = await hashPassword(newPassword);
    await User.findOneAndUpdate(user._id, { password: hashingPassword });
    return res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while forgot password",
      error,
    });
  }
};
