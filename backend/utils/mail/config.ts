import { EmailParams, Sender, Recipient, MailerSend } from "mailersend";

const MailerSendObject = new MailerSend({ apiKey: process.env.MAILERSEND });
const mailParams = new EmailParams();
const mailersender = new Sender("no-reply@mail.qolha.3adl.dev", "Qolha Team");

export default async function sendVarificationMail({ email, username, code, userID }: { email: string; username: string; code: string; userID: string }) {
    const Recipients = [new Recipient(email, username)];

    const mail = mailParams.setFrom(mailersender).setTo(Recipients).setSubject("Qolha  Email Verify").setHtml(`


    <div>
    <a href="https://api.qolha.3adl.dev/account/verify?userID=${userID}&code=${code}">Click here to verify your Account</a>
    </div>

`);
    return await MailerSendObject.email.send(mail);
}
