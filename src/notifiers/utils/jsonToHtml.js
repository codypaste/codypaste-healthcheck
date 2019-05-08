'use strict';

const example = require('./exampleResults.json');

const jsonKeyToHmlTagsMappings = {
  jobStartDatetime: "h2",
  jobName: "h1",
  operationsPerformed: "div",
  operationName: "h3",
  operationDatetime: "p",
  payload: "p",
  response: "p",
  executionTime: "p"
}

const toHtmlTag = (propName, propValue) => {
  const propAsTag = jsonKeyToHmlTagsMappings[propName];
  if(!propAsTag) {
    return null;
  }

  return `<${propAsTag}>${JSON.stringify(propValue)}</${propAsTag}>`
}

const mapJobResult = jsonResult => {
  let mapped = '';

  Object.keys(jsonResult).forEach(property => {
    const propertyValue = jsonResult[property];
    
    if (Array.isArray(propertyValue)) {
      let innerPropertiesMapped = '';

      propertyValue.forEach(innerElement => {
        let innerElementMapped = '';
        Object.keys(innerElement).forEach(innerElemProp => {
          const tag = toHtmlTag(innerElemProp, innerElement[innerElemProp]);
          innerElementMapped += tag ? tag : '';
        })
        innerPropertiesMapped += innerElementMapped;
      })

      const tag = toHtmlTag(property, innerPropertiesMapped);
      mapped += tag ? tag : '';  
    }
    else {
      const tag = toHtmlTag(property, propertyValue);
      mapped += tag ? tag : '';  
    }
  })

  return mapped;
}

const mapResults = jobsResults => {
  jobsResults.forEach(jobResult => {
    const mapped = mapJobResult(jobResult);
    console.log(mapped);
  })
};

module.exports = mapResults;

mapResults(example);

/**
  Current implementation gave following results for example object:
 
  <h2>"2019-05-08T21:41:28.984Z"</h2>
  <h1>"SNIPPETS_SERVICE_HEALTHCHECK"</h1>
  <div>"
    <p>\"2019-05-08T21:41:30.223Z\"</p>
    <h3>\"CREATE_GROUP\"</h3>
    <p>{\"title\":\"c83f57d097\",\"expirationDatetime\":null}</p>
    <p>
      {\"author\":\"unknown\",\"updatedAt\":\"2019-05-08T21:41:30.020Z\",\"isEncrypted\":false,\"description\":null,\"isPublic\":true,\"id\":\"cjvfqzinz00090799bbvftahm\",\"createdAt\":\"2019-05-08T21:41:30.020Z\",\"isProtected\":false,\"title\":\"c83f57d097\",\"expirationDatetime\":null}
    </p>
    <p>1237</p>
    <p>\"2019-05-08T21:41:30.416Z\"</p>
    <h3>\"CREATE_SNIPPET\"</h3>
    <p>
      {\"snippet\":\"9e84a9099b67507f5d5479c5b38202696eed323e\",\"group\":\"cjvfqzinz00090799bbvftahm\",\"author\":\"Healthcheck
      service\",\"snippetName\":\"Healthcheck service test snippet\",\"syntax\":\"Plain Text\"}</p>
    <p>{\"author\":\"Healthcheck service\",\"updatedAt\":\"2019-05-08T21:41:30.298Z\",\"snippetName\":\"Healthcheck
      service test snippet\",\"syntax\":\"Plain
      Text\",\"id\":\"cjvfqziv5000g0799nji6nyjm\",\"createdAt\":\"2019-05-08T21:41:30.298Z\"}</p>
    <p>192</p>
    <p>\"2019-05-08T21:41:30.575Z\"</p>
    <h3>\"SEARCH_GROUP\"</h3>
    <p>{\"groupId\":\"cjvfqzinz00090799bbvftahm\"}</p>
    <p>
      {\"group\":{\"author\":\"unknown\",\"updatedAt\":\"2019-05-08T21:41:30.020Z\",\"isEncrypted\":false,\"description\":null,\"isPublic\":true,\"id\":\"cjvfqzinz00090799bbvftahm\",\"createdAt\":\"2019-05-08T21:41:30.020Z\",\"isProtected\":false,\"title\":\"c83f57d097\",\"expirationDatetime\":null},\"snippets\":[{\"author\":\"Healthcheck
      service\",\"updatedAt\":\"2019-05-08T21:41:30.298Z\",\"snippetName\":\"Healthcheck service test
      snippet\",\"syntax\":\"Plain
      Text\",\"id\":\"cjvfqziv5000g0799nji6nyjm\",\"createdAt\":\"2019-05-08T21:41:30.298Z\",\"snippet\":\"9e84a9099b67507f5d5479c5b38202696eed323e\"}]}
    </p>
    <p>159</p>
    <p>\"2019-05-08T21:41:30.843Z\"</p>
    <h3>\"DELETE_GROUP\"</h3>
    <p>\"cjvfqzinz00090799bbvftahm\"</p>
    <p>\"\"</p>
    <p>268</p>"
  </div>
  <p>1857</p>
*/

