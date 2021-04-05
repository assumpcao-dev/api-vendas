import nodemailer from 'nodemailer'
import handlebarsMailTemplate from './handlebarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number

}
interface IParserMailTemplate {
  template: string
  variables: ITemplateVariable
}

interface IMailContact {
  name: string
  email: string
}

interface isSendMail {
  to: IMailContact
  from?: IMailContact
  subject: string
  templateData: IParserMailTemplate
}
export default class EtherealMail {
  static async sendMail( { to, from, subject, templateData}: isSendMail): Promise<void> {
    const account = await nodemailer.createTestAccount()

    const mailTemplate =  new handlebarsMailTemplate()

    const transporter = await nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    })

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Team * Support Sales API.',
        address: from?.name || 'noreply@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parser(templateData)
    })
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));




  }

}
