import nodemailer from "nodemailer";
export function transpoter() {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your-email-address@gmail.com",
      pass: "your-email-password",
    },
  });
  return transporter;
}
