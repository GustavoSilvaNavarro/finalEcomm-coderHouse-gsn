import nodemailer from 'nodemailer';

import logger from '../../config/logs/loggers.js';
import env from '../env/env-variables.js';

//! CREATE A TEST ACCOUNT
// async function createTestCreds() {
//   const creds = await nodemailer.createTestAccount();
//   console.log({ creds });
// }

// createTestCreds();

//! SETUP CONFIG
const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  auth: {
    user: env.smtp.user,
    pass: env.smtp.pass,
  },
});

async function sendEmail(payload) {
  try {
    const info = await transporter.sendMail(payload);
    logger.info(`Message was sent successfully: ${info.response}`);
  } catch (err) {
    logger.error(err.message || err.toString());
    throw err;
  }
}

export default sendEmail;
