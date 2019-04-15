'use strict';
const jobsEnum = require('./jobsEnum');
const snippetsServiceHealthcheck = require('./snippetsService/snippetsServiceHealthcheck');

const healthcheckJobsFactory = (statusesGatherer) => {
  const initializeHealthcheckProcess = jobName => {
    switch (jobName) {
      case jobsEnum.SNIPPETS_SERVICE_HEALTHCHECK:
        return snippetsServiceHealthcheck(statusesGatherer.initializeForJob(jobsEnum.SNIPPETS_SERVICE_HEALTHCHECK));
      default:
        throw new Error('Unknown healthcheck process!');
    }
  }

  return {
    initializeHealthcheckProcess
  }
};

module.exports = healthcheckJobsFactory;