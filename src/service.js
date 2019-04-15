'use strict';
const healthchecksRunner = require('./healthchecksRunner');
const healthchecksStatusesGatherer = require('./healthcheckJobs/healthchecksStatusesGatherer');
const healthcheckJobsFactory = require('./healthcheckJobs/healthcheckJobsFactory');
const emailReporter = require('./notifiers/emailReporter');
const logger = require('./utils/logger');

const healthcheckService = () => {
  const start = async () => {
    const statusesGatherer = healthchecksStatusesGatherer(); 
    
    logger.info(`Starting healthcheck jobs...`);
    const hcJobRunner = healthchecksRunner(healthcheckJobsFactory(statusesGatherer));
    await hcJobRunner.runJobs();

    await emailReporter(statusesGatherer).sendReport();

    return statusesGatherer.getAllJobsResults();
  }; 

  return {
    start
  };
}

module.exports = healthcheckService;
