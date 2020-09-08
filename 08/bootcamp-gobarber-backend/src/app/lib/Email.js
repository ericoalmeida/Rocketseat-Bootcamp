import nodemailer from 'nodemailer';
import expresshdb from 'express-handlebars';
import nodemailerhdb from 'nodemailer-express-handlebars';
import { resolve } from 'path';

import emailSettings from '../../settings/email';

class Email {
  constructor() {
    const { host, port, secure, auth } = emailSettings;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureEmailTemplates();
  }

  configureEmailTemplates() {
    const viewPath = resolve(__dirname, '..', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhdb({
        viewEngine: expresshdb.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendEmail(message) {
    return this.transporter.sendMail({
      ...emailSettings.default,
      ...message,
    });
  }
}

export default new Email();
