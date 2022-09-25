import { logger } from 'handlebars';
import twilio from 'twilio';

import env from '../env/env-variables.js';

const client = twilio(env.smsPublicSid, env.smsSecretKey);

export async function sendTextMessages(body, phone) {
  try {
    const message = await client.messages.create({
      from: env.adminPhoneNumber,
      to: phone,
      body,
    });

    console.log(message);
  } catch (err) {
    logger.error(err.message || err.toString());
  }
}
