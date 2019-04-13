'use strict'
const logger = require('./utils/logger');
const healthcheckJobs = require('./healthcheckJobs/jobsEnum');

const healthchecksRunner = (healthcheckJobsFactory, singleJobToRun) => {
  const singleJobRunner = jobName => Array.from(healthcheckJobsFactory.initializeHealthcheckProcess(jobName));
  const allJobsRunner = () => Object.keys(healthcheckJobs).map(hcJob => healthcheckJobsFactory.initializeHealthcheckProcess(hcJob));

  const runJobs = async () => {
    const runTargets = singleJobToRun ? singleJobRunner(singleJobToRun) : allJobsRunner();
    
    for (const jobTarget of runTargets) {
      try {
        await jobTarget.run();
      } catch (e) {
        logger.error(`Error while running job.`, e);
      }
    }
  } 

  return {
    runJobs
  }
}

module.exports = healthchecksRunner;

