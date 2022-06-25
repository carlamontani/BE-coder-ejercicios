import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";

export async function createUser(req, res) {
  const { body } = req;
  const password = jwt.sign({ password: body.password }, process.env.PRIVATE_KEY);
  body.password = password;
  try {
    const response = await UserModel.create(body);
    sendMailEthereal(body.email);
    res.status(200).json({ user: response });
  } catch (error) {
    console.log(error);
  }
}


dotenv.config();

const transporter = createTransport({
  host: process.env.SMTP,
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

async function sendMailEthereal(mail) {
  try {
    const response = await transporter.sendMail({
      from: process.env.EMAIL,
      to: [mail,'carlamontani@gmail.com', process.env.EMAIL],
      subject: "Nuevo registro",
      html: `<h1>hola nuevo ${mail}</h1>`,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
