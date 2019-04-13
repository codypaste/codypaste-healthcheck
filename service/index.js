const config = require('config');
const healthcheckService = require('./src/service');
const logger = require('./src/utils/logger');

(async () => {
  try {
    await healthcheckService(logger).start();
  } catch (err) {
    logger.error(`Error while starting service, ${err}`);
    process.exit(1);
  }
})();
