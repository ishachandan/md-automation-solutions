const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Email options
  const mailOptions = {
    from: `Automation Solutions <${process.env.EMAIL_FROM}>`,
    to: options.to,
    subject: options.subject,
    html: options.html
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

module.exports = sendEmail;
