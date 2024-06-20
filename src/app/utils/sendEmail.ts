import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'habibkazi92@gmail.com',
      pass: 'yrwitbpqpbtnrhyy',
    },
  });

  await transporter.sendMail({
    from: 'habibkazi92@gmail.com', // sender address
    to, // list of receivers
    subject: 'Hello user ? Reset your password within 10 minutes ', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
