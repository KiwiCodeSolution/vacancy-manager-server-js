const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.kiwicode.tech", //не трогать
    port: 465, //не трогать
    secure: true,
    auth: {
        user: "leha@kiwicode.tech", // почта юзера или сервиса на кивикоде
        pass: "11111111", // замените на пароль от учетной записи
    },
});

function sendEmail({ email, html, letterSubject }) {
    const mailOptions = {
        from: "leha@kiwicode.tech", // от кого
        to: email, //кому
        subject: letterSubject, //Тему письма писать обязательно  приоретет выставляеться выше ! больше шансов не попасть в спам
        text: html, // тело сообщения
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

module.exports = sendEmail;
