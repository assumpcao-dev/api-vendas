import nodemailer from 'nodemailer'

interface isEmail {
  to: string
  body: string
}
export default class EtherealMail {
  static async sendMail( { to, body}: isEmail): Promise<void> {
    const account = await nodemailer.createTestAccount()

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
      from: 'noreply@apivendas.com.br',
      to,
      subject: 'Recovery password',
      text: body
    })
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));




  }

}
