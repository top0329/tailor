import nodemailer from "nodemailer";

import {
  MAILING_EMAIL,
  MAILING_HOST,
  MAILING_PASSWORD,
  MAILING_PORT,
  MAILING_SECURE,
} from "@/constants/env";

const config = {
  host: MAILING_HOST,
  port: parseInt(MAILING_PORT),
  secure: MAILING_SECURE === "true",
  auth: {
    user: MAILING_EMAIL,
    pass: MAILING_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

export const sendMail = (email: string, subject: string, html: string) => {
  return transporter.sendMail({
    from: MAILING_EMAIL,
    to: email,
    subject,
    html,
  });
};
