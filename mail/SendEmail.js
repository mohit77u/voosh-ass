const nodemailer = require("nodemailer");

const sendEmail = async(email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        var message = {
            from: process.env.MAIL_FROM,
            to: email,
            subject: subject,
            text: text,
        }
        await transporter.sendMail(message);
    } catch (error) {}
};

module.exports = sendEmail;