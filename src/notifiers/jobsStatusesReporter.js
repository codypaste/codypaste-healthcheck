'use strict';
const config = require('config');
const jobsStatusesReporter = config.get('jobsStatusesReporter');

const jobStatusesReporter = (healthchecksStatusesGatherer) => {
  const jobResults = healthchecksStatusesGatherer.getAllJobsResults();    
};

module.exports = jobStatusesReporter;