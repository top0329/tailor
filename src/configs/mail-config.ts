export const mailConfig = {
  host: process.env.MAILING_HOST || "",
  port: parseInt(process.env.MAILING_PORT || ""),
  secure: process.env.MAILING_SECURE === "true",
  auth: {
    user: process.env.MAILING_EMAIL || "",
    pass: process.env.MAILING_PASSWORD || "",
  },
};
