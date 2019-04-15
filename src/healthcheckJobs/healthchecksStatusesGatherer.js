'use strict';
const moment = require('moment');
const logger = require('../utils/logger');

const healthchecksStatusesGatherer = () => {
    const allJobsResults = [];
    const gatherJobResult = jobResult => allJobsResults.push(jobResult);
    const getAllJobsResults = () => allJobsResults;

    const prepareTemplate = jobName => ({
        jobStartDatetime: moment().utc(),
        jobName,
        operationsPerformed: [],
        executionTime: '',
        errorsEncountered: []
    })
    
    const initializeForJob = (jobName) => {
        logger.info(`Initialized status gatherer for ${jobName}`);
        const operationsResultsGathered = prepareTemplate(jobName);
        
        const getJobResultsGathered = () => operationsResultsGathered;
        const collectOperationResults = ({operationName, payload, response, executionTime}) => {
            const { operationsPerformed } = operationsResultsGathered;
            operationsPerformed.push({
                operationDatetime: moment().utc(),
                operationName, 
                payload, 
                response, 
                executionTime
            });
        };
        const collectError = ({operationName, e}) => {
            const { errorsEncountered } = operationsResultsGathered;
            errorsEncountered.push({operationName, e});
        }
        const saveJobExecutionTime = execTime => operationsResultsGathered.executionTime = execTime;
        const saveResults = async () => {
            // TODO: Store gathered results in database
            console.log(JSON.stringify(operationsResultsGathered, null, 2));
            gatherJobResult(operationsResultsGathered);
        }
        
        return {
            collectOperationResults,
            collectError,
            saveJobExecutionTime,
            saveResults,
            getJobResultsGathered
        }
    };

    return {
        initializeForJob,

        gatherJobResult,
        getAllJobsResults
    }
};

module.exports = healthchecksStatusesGatherer;