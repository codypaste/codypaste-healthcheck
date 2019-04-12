'use strict';
const jobsEnum = require('./jobsEnum');
const snippetsServiceHealthcheck = require('./snippetsService/snippetsServiceHealthcheck');

const healthcheckJobsFactory = () => {
  const initializeHealthcheckProcess = jobName => {
    switch (jobName) {
      case jobsEnum.SNIPPETS_SERVICE_HEALTHCHECK:
        return snippetsServiceHealthcheck();
      default:
        throw new Error('Unknown healthcheck process!');
    }
  }

  return {
    initializeHealthcheckProcess
  }
};

module.exports = healthcheckJobsFactory;