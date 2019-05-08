'use strict';

const mailReportBuilder = (notificationDefaults, notifyOnlyOnErrors) => {
  const jsonToHtml = jobsInfo => {

  };
  
  const buildNotificationSubject = () => {

  };

  const prepareReport = jobResults => {
    const jobsInfo = String(notifyOnlyOnErrors) === "true" ? jobResults.filter(jr => jr.errorsEncountered.length !== 0) : jobResults;

    return {
      html: jsonToHtml(jobsInfo),
      subject: buildNotificationSubject(),
      ... notificationDefaults
    }
  };

  return { prepareReport };
}
