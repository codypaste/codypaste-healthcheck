const config = require('config');
const healthcheckService = require('./src/service');

const initializeLogger = () => {
  const info = msg => console.log(msg);
  const error = msg => console.error(msg);
  
  return { 
    info,
    error
  };
}

(async () => {
  const logger = initializeLogger();
  try {
    await healthcheckService(logger).runAll();
  } catch (err) {
    logger.error(`Error while starting service, ${err}`);
    process.exit(1);
  }
})();
