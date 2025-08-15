import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

export const sendEmail = (to, otp) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It is only valid for 5 minutes.`
  };

  return transporter.sendMail(mailOptions);
};
