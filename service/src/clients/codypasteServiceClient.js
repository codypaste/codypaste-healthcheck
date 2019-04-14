'use strict';
const rp = require('request-promise');

const codypasteServiceClient = ({snippetsUrl, groupsUrl}) => {
    const postRequest = async (uri, payload, overrides) => {
        const options = Object.assign({},
            {
                method: "POST",
                uri,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
                json: true
            }, overrides);

        return rp(options);
    }
    
    const postGroup = async payload => postRequest(groupsUrl, payload);
    const postSnippet = async payload => postRequest(snippetsUrl, payload);

    return {
        postGroup,
        postSnippet
    }

};

module.exports = codypasteServiceClient;