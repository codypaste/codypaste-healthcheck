'use strict';
const config = require('config');
const nodemailer = require("nodemailer");

const mailerConfig = config.get('jobsStatusesReporter');

const emailReporter = () => {
    const mailerClient = nodemailer.createTransport({
        service: 'gmail',
        auth: mailerConfig.mailerCredentials
    });
    
    const buildReport = (subject, message) => ({
        from: 'Codypaste Healthcheck',
        to: mailerConfig.reportsAddressees,
        subject,
        text: message
    });

    const sendReport = async (healthchecksStatusesGatherer) => {
        const jobResults = healthchecksStatusesGatherer.getAllJobsResults();
        const jobsInfo = mailerConfig.notifyOnlyOnErrors === "true" ? jobResults.filter(jr => jr.errorsEncountered.length !== 0) : jobResults;
        return mailerClient.sendMail(buildReport('Test', JSON.stringify(jobsInfo)));
    };

    return {
        sendReport
    };
};

module.exports = emailReporter;