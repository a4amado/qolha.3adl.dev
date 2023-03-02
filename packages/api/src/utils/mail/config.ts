import { EmailParams, Sender, Recipient, MailerSend } from "mailersend";

const MailerSendObject = new MailerSend({ apiKey: process.env.MAILERSEND });
const mailParams = new EmailParams();
const mailersender = new Sender("no-reply@mail.qolha.3adl.dev", "Qolha Team");

export default async function sendTestMail({ email, username, code, userID }: { email: string; username: string; code: number; userID: string }) {
    const Recipients = [new Recipient(email, username)];

    const mail = mailParams.setFrom(mailersender).setTo(Recipients).setSubject("Qolha  Email Verify").setHtml(`


    <div>
    <a href="https://qolha.3adl.dev/api/auth/verify/${code}?q=${userID}">Click here to verify your Account</a>
    </div>

`);
    await MailerSendObject.email.send(mail);
}
