const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAIL_FROM, MAIL_PASS } = process.env;
console.log("Mail-from:", MAIL_FROM);
console.log("Mail-pass:", MAIL_PASS);

const transporter = nodemailer.createTransport({
    // host: "mail.kiwicode.tech", //не трогать
    // port: 465, //не трогать
    // secure: true,
    service: "gmail",

    auth: {
        user: MAIL_FROM, // почта юзера или сервиса на кивикоде
        pass: MAIL_PASS, // замените на пароль от учетной записи
    },
});

function sendEmail({ email, html, letterSubject }) {
    const mailOptions = {
        from: MAIL_FROM, // от кого
        to: email, //кому
        subject: letterSubject, //Тему письма писать обязательно  приоретет выставляеться выше ! больше шансов не попасть в спам
        html, // тело сообщения
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("nodemailer error:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

module.exports = sendEmail;
