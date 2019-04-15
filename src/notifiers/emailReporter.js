'use strict';
const nodemailer = require("nodemailer");

/*
    Example implementation based on https://nodemailer.com/about/#example
*/
const emailReporter = (healthchecksStatusesGatherer) => {
    const jobResults = healthchecksStatusesGatherer.getAllJobsResults();

    const initializeMailer = async () => {
        const testAccount = await nodemailer.createTestAccount();

        return nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    }
    
    const sendReport = async () => {
        const mailClient = await initializeMailer();

        await mailClient.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: "bar@example.com, baz@example.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>"
        });
    };

    return {
        sendReport
    };
};

module.exports = emailReporter;