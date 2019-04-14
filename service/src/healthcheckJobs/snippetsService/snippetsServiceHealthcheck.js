const logger = require('../../utils/logger');
const config = require('config');
const snippetsServiceClient = require('../../clients/codypasteServiceClient');

const {
  postGroupPayload,
  postSnippetPayload
} = require('./payloadsHelpers');

const snippetsServiceOperations = {
  CREATE_GROUP: 'CREATE_GROUP',
  CREATE_SNIPPET: 'CREATE_SNIPPET'
}
const snippetsServiceHealthcheck = (statusGatherer) => {
  const client = snippetsServiceClient(config.get('jobsConfig.snippetsServiceHealthcheck'));

  const performCheckup = async (operationName, payload, handler) => {
    logger.info(`Performing checkup of ${operationName}...`);
    
    let response;
    try {
      const operationStart = new Date();
      response = await handler(payload);
      const executionTime = new Date() - operationStart;
      statusGatherer.collectOperationResults({ operationName, payload, response, executionTime});
    } catch (e) {
      statusGatherer.collectOperationResults({ operationName, e});
      throw e;
    }

    return response;
  }

  const run = async () => {
    logger.info('Running Snippets Service healthcheck');
    const jobStart = new Date();

    // Group creation checkup
    const groupPayload = postGroupPayload();
    const {id} = await performCheckup(snippetsServiceOperations.CREATE_GROUP, groupPayload, client.postGroup);
    
    // Snippet creation checkup
    const snippetPayload = postSnippetPayload(id);
    await performCheckup(snippetsServiceOperations.CREATE_SNIPPET, snippetPayload, client.postSnippet);

    const jobDuration = new Date() - jobStart;
    logger.info(`Snippets Service healthcheck job execution time ${jobDuration} ms`);
    statusGatherer.saveJobExecutionTime(jobDuration);

    await statusGatherer.saveResults(jobDuration);
  }

  return {
    run
  };
};

module.exports = snippetsServiceHealthcheck;