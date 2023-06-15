import { createHash } from 'crypto';
import * as FormData from 'form-data'

import Mailgun from "mailgun.js"
const mailgun = new Mailgun(FormData);
export const mailgunClient = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || '192986a7082f10b252c37f397079936f-6b161b0a-a5507522'});

export const SECRET_KEY=  'jsexpert-secret-key'
export const createInputHash = (input: string) => {
    return createHash('sha256').update(input).digest('hex');
  }
export const sendEmail = async (to: string, subject: string, html: string) => {
    const data = {
        from: 'Jsexpert Team <admin@jsexpert.io>',
        to,
        subject,
        html
    };
    return await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN || 'jsexpert.io', data);
}