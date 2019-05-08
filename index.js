'use strict';
const healthcheckService = require('./src/service');
const logger = require('./src/utils/logger');

const codypasteHealthcheck = async () => {
  try {
    const hcResults = await healthcheckService().start();
    return {
      statusCode: 200,
      body: JSON.stringify(hcResults)
    }
  } catch (err) {
    logger.error(`Error while starting service, ${err}`);
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}; 

(async() => {
  await codypasteHealthcheck();
})();