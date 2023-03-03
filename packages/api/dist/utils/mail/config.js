"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailersend_1 = require("mailersend");
const MailerSendObject = new mailersend_1.MailerSend({ apiKey: process.env.MAILERSEND });
const mailParams = new mailersend_1.EmailParams();
const mailersender = new mailersend_1.Sender("no-reply@mail.qolha.3adl.dev", "Qolha Team");
function sendTestMail({ email, username, code, userID }) {
    return __awaiter(this, void 0, void 0, function* () {
        const Recipients = [new mailersend_1.Recipient(email, username)];
        const mail = mailParams.setFrom(mailersender).setTo(Recipients).setSubject("Qolha  Email Verify").setHtml(`


    <div>
    <a href="https://api.qolha.3adl.dev/auth/verify/${code}?q=${userID}">Click here to verify your Account</a>
    </div>

`);
        yield MailerSendObject.email.send(mail);
    });
}
exports.default = sendTestMail;
