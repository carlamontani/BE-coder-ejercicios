import dotenv from "dotenv";

dotenv.config();

import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { createTransport } from "nodemailer";

import * as emailService from '../services/email.service.js' //servicio nuevo email

export async function createUser(req, res) {
  const { body } = req;
  const password = jwt.sign({ password: body.password }, process.env.PRIVATE_KEY);
  body.password = password;
  try {
    const response = await UserModel.create(body);
    emailService.sendMailEthereal(body.email);
    res.status(200).json({ user: response });
  } catch (error) {
    console.log(error);
  }
}

const transporter = createTransport({
  host: process.env.SMTP,
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

