'use strict';
const healthchecksRunner = require('./healthchecksRunner');
const healthcheckJobsFactory = require('./healthcheckJobs/healthcheckJobsFactory');

const healthcheckService = (logger) => {
  const start = async () => {
    logger.info(`Starting healthcheck jobs...`);
    const hcJobRunner = healthchecksRunner(healthcheckJobsFactory());
    await hcJobRunner.runJobs();
  }; 

  return {
    start
  };
}

module.exports = healthcheckService;
