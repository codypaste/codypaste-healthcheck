'use strict';
const healthchecksRunner = require('./healthchecksRunner');
const healthchecksStatusesGatherer = require('./healthcheckJobs/healthchecksStatusesGatherer');
const healthcheckJobsFactory = require('./healthcheckJobs/healthcheckJobsFactory');
const emailReporter = require('./notifiers/emailReporter');

const healthcheckService = (logger) => {
  const start = async () => {
    const statusesGatherer = healthchecksStatusesGatherer(); 
    const jobsFactory = healthcheckJobsFactory(statusesGatherer);
    
    logger.info(`Starting healthcheck jobs...`);
    const hcJobRunner = healthchecksRunner(jobsFactory);
    await hcJobRunner.runJobs();

    await emailReporter(statusesGatherer).sendReport();
  }; 

  return {
    start
  };
}

module.exports = healthcheckService;
