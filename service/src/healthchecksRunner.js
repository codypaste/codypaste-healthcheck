const healthchecksRunner = (healthcheckJobsFactory) => {
  const run = async jobName => {
    const hcJob = healthcheckJobsFactory.initializeHealthcheckProcess(jobName);
  };

  return {
    run
  }
}

module.exports = healthchecksRunner;

