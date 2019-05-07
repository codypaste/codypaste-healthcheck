const logger = require('../../utils/logger');
const config = require('config');
const snippetsServiceClient = require('../../clients/codypasteServiceClient');

const {
  groupCreatePayload,
  snippetCreatePayload,
  groupSearchPayload
} = require('./payloadsHelpers');

const snippetsServiceOperations = {
  CREATE_GROUP: 'CREATE_GROUP',
  CREATE_SNIPPET: 'CREATE_SNIPPET',
  SEARCH_GROUP: 'SEARCH_GROUP',
  DELETE_GROUP: 'DELETE_GROUP'
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
    } catch (error) {
      statusGatherer.collectOperationResults({ operationName, payload, response, error});
    }

    return response;
  }

  const run = async () => {
    logger.info('Running Snippets Service healthcheck');
    const jobStart = new Date();

    // Group creation checkup
    const groupPayload = groupCreatePayload();
    const {id} = await performCheckup(snippetsServiceOperations.CREATE_GROUP, groupPayload, client.createGroup);
    
    // Snippet creation checkup
    const snippetPayload = snippetCreatePayload(id);
    await performCheckup(snippetsServiceOperations.CREATE_SNIPPET, snippetPayload, client.createSnippet);
    
    // Group search checkup
    const searchPayload = groupSearchPayload(id);
    await performCheckup(snippetsServiceOperations.SEARCH_GROUP, searchPayload, client.searchGroup);

    // Group and snippets delete checkup
    await performCheckup(snippetsServiceOperations.DELETE_GROUP, id, client.deleteGroupWithSnippets);

    const jobDuration = new Date() - jobStart;
    logger.info(`Snippets Service healthcheck job execution time ${jobDuration} ms`);
    statusGatherer.saveJobExecutionTime(jobDuration);

    await statusGatherer.saveResults(jobDuration);

    return statusGatherer;
  }

  return {
    run
  };
};

module.exports = snippetsServiceHealthcheck;