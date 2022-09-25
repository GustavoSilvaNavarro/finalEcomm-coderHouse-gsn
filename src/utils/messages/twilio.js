import twilio from 'twilio';

import env from '../env/env-variables.js';
import logger from '../../config/logs/loggers.js';

const client = twilio(env.smsPublicSid, env.smsSecretKey);

export async function sendTextMessages(from, body, phone) {
  try {
    const message = await client.messages.create({
      from,
      to: phone,
      body,
    });

    console.log(message);
  } catch (err) {
    logger.error(err.message || err.toString());
  }
}
