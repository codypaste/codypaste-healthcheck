const logger = require('../../utils/logger');
const config = require('config');
const snippetsServiceClient = require('../../clients/codypasteServiceClient');

const snippetsServiceHealthcheck = () => {
  const client = snippetsServiceClient(config.get('jobsConfig.snippetsServiceHealthcheck'));
  
  const run = () => {
    logger.info('Running snippetsServiceHealthcheck');
  }

  return {
    run
  };
};

module.exports = snippetsServiceHealthcheck;