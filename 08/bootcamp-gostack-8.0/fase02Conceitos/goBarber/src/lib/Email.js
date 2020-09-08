import nodemailer from 'nodemailer';
import { resolve } from 'path';
import expressHbs from 'express-handlebars';
import nodemailerHbs from 'nodemailer-express-handlebars';

import emailConfig from '../config/email';

class Email {
  constructor() {
    const { host, port, secure, auth } = emailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configurarTemplates();
  }

  configurarTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use(
      'compile',
      nodemailerHbs({
        viewEngine: expressHbs.create({
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

  enviarEmail(mensagem) {
    return this.transporter.sendMail({
      ...emailConfig.default,
      ...mensagem,
    });
  }
}

export default new Email();
