'use strict';
const moment = require('moment');
const logger = require('../utils/logger');

const healthchecksStatusesGatherer = () => {
    const prepareTemplate = jobName => ({
        jobStartDatetime: moment().utc(),
        jobName,
        operationsPerformed: [],
        executionTime: '',
        errorsEncountered: []
    })
    
    const initializeForJob = (jobName) => {
        logger.info(`Initialized status gatherer for ${jobName}`);
        const operationsGathered = prepareTemplate(jobName);
        
        const collectOperationResults = ({operationName, payload, response, executionTime}) => {
            const { operationsPerformed } = operationsGathered;
            operationsPerformed.push({
                operationDatetime: moment().utc(),
                operationName, 
                payload, 
                response, 
                executionTime
            });
        };
        const collectError = ({operationName, e}) => {
            const { errorsEncountered } = operationsGathered;
            errorsEncountered.push({operationName, e});
        }
        const saveJobExecutionTime = execTime => operationsGathered.executionTime = execTime;
        const saveResults = async () => {
            // TODO: Store gathered results in database
            console.log(JSON.stringify(operationsGathered, null, 2));
        }

        return {
            collectOperationResults,
            collectError,
            saveJobExecutionTime,
            saveResults
        }
    };

    return {
        initializeForJob
    }
};

module.exports = healthchecksStatusesGatherer;