'use strict'
const logger = require('./utils/logger');
const healthcheckJobs = require('./healthcheckJobs/jobsEnum');

const healthchecksRunner = (healthcheckJobsFactory, singleJobToRun = false) => {  
  const initializeJob = jobName => healthcheckJobsFactory.initializeHealthcheckProcess(jobName);

  const singleJobRunner = hcJob => Array.from(initializeJob(hcJob));
  const allJobsRunner = () => Object.keys(healthcheckJobs).map(hcJob => initializeJob(hcJob));

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

