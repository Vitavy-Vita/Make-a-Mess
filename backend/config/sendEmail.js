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

  transporter.sendMail(options, (err) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        message: "Email not sent",
      });
    }
  });
};

const EmailSender = ({ fullname, email, message }) => {
  const options = {
    from: `Make-a-Mess 🍔${process.env.EMAIL}`,
    to: process.env.EMAIL,
    subject: "New user message",
    text: "This is a test message",
    html: `<section
    style="
      text-align: start;
      border: 5px solid #c85a44;
      border-radius: 15px
    "
  >
    <h1
      style="
        font-family: Rowdies, sans-serif;
        color: #825b56;
        font-size: 30px;
        padding: 0 0.5em;
      "
    >
    NEW MESSAGE RECEIVED!
    </h1>
    <p
      style="
        font-family: Roboto, sans-serif;
        color: #825b56;
        font-size: 25px;
        padding: 0 0.5em;
      "
    >
    This message comes from <strong>${fullname}</strong>
    </p>
    <p
      style="
        font-family: Roboto, sans-serif;
        color: #825b56;
        font-size: 25px;
        padding: 0 0.5em;
      "
    >
    Email: ${email}
    </p>
    <p
      style="
        font-family: Roboto, sans-serif;
        color: #825b56;
        font-size: 25px;
        padding: 0 0.5em;
      "
    >
    Message: ${message}
    </p>
    <article
      style="width: 100%; height: 10em; background-color: #c85a44"
    >
    <img src="cid:burger-logo">
    </article>
  </section>`,
    // html: `<h1>New message received!</h1>
    // <p>This message comes from ${fullname}</p>
    // <p>from: ${email}</p>
    // <p>Message: ${message}</p>`,
  };
  Email(options);
};

const ForgotPassword = ({ userEmail, OTP }) => {
  const options = {
    from: `Make-a-Mess 🍔<${process.env.EMAIL}`,
    to: userEmail,
    subject: "Forgot password ?",
    text: "This is a test message",
    html: `<section
    style="
      text-align: center;
      border: 5px solid #c85a44;
      border-radius: 15px
    "
  >
    <h1
      style="
        font-family: Rowdies, sans-serif;
        color: #825b56;
        font-size: 30px;
      "
    >
      PASSWORD RECOVERY PROCEDURE
    </h1>
    <p
      style="
        font-family: Roboto, sans-serif;
        color: #825b56;
        font-size: 25px;
        padding: 0 0.5em;
      "
    >
      Use the following OTP to complete your Password Recovery Procedure.
      <br />
      OTP is valid for 5 minutes.
    </p>
    <h2
      style="
        font-family: Rowdies, sans-serif;
        color: #c85a44;
        font-size: 50px;
      "
    >
      ${OTP}
    </h2>
    <article
      style="width: 100%; height: 10em; background-color: #c85a44"
    >
    <img src="cid:burger-logo">
    </article>
  </section>`,
  };
  Email(options);
};
export { EmailSender, ForgotPassword };
