import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import handlebarsMailTemplate from './handlebarsMailTemplate';
import mailConfig from '@config/mail/mail';

interface ITemplateVariable {
  [key: string]: string | number;
}
interface IParserMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}

interface isSendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParserMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: isSendMail): Promise<void> {
    const mailTemplate = new handlebarsMailTemplate();

    const transporter = await nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });
    const { email, name } = mailConfig.defaults.from;

    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.name || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parser(templateData),
    });
  }
}
