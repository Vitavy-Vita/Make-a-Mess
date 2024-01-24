import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const Email = (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465, 
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

const EmailSender = ({ fullname, email, message }) => {
  const options = {
    from: `Make-a-Mess 🍔<${process.env.EMAIL}`,
    to: process.env.EMAIL,
    subject: "New user message",
    text: "This is a test message",
    html: `<h1>New message received</h1>
    <p>This message comes from ${fullname}</p>
    <p>from: ${email}</p>
    <p>Message: ${message}</p>`,
  };
  Email(options);
};

export default EmailSender;
