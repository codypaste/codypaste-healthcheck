'use strict';
const healthchecksRunner = require('./healthchecksRunner');
const healthcheckJobs = require('./healthcheckJobs/jobsEnum');
const healthcheckJobsFactory = require('./healthcheckJobs/healthcheckJobsFactory');

const healthcheckService = (logger) => {
  const runAll = () => {
    logger.info(`Running all healthcheck jobs...`);

    const hcJobsRunners = Object.keys(healthcheckJobs).map(
      hcJob => healthchecksRunner(healthcheckJobsFactory().initializeHealthcheckProcess(hcJob))
    );
  }; 

  return {
    runAll
  };
}

module.exports = healthcheckService;
