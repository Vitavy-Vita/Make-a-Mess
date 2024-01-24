import EmailSender from "../config/sendEmail.js";

export const email = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;
    const checkName =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const checkNameLength = /^.{1,30}$/;
    const checkEmail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const checkMessage = /^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/;

    if (
      fullname.trim() === "" ||
      email.trim() === "" ||
      message.trim() === ""
    ) {
      return res.status(401).json({
        message: "Please provide all informations",
      });
    }

    if (!checkName.test(fullname)) {
      return res.status(401).json({
        message: "Name format incorrect",
      });
    }

    if (!checkNameLength.test(fullname)) {
      return res.status(401).json({
        message: "Name must be 30 characters maximum",
      });
    }

    if (!checkEmail.test(email)) {
      return res.status(401).json({
        message: "Email format incorrect",
      });
    }

    if (!checkMessage.test(email)) {
      return res.status(401).json({
        message: "Message format incorrect",
      });
    }

    EmailSender({ fullname, email, message });

    res.status(200).json({
      message: "Message sent",
    });
  } catch (error) {
    res.status(404).json({
      message: "Message not found",
    });
  }
};
