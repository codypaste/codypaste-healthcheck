'use strict';
const rp = require('request-promise');

const codypasteServiceClient = ({
    snippetsUrl, 
    groupsUrl,
    groupsSearchUrl
}) => {
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

    const deleteRequest = async (uri, id, overrides) => {
        const options = Object.assign({},
            {
                method: "DELETE",
                uri: `${uri}/${id}`,
            }, overrides);

        return rp(options);
    };
    
    const createGroup = async payload => postRequest(groupsUrl, payload);
    const createSnippet = async payload => postRequest(snippetsUrl, payload);
    const searchGroup = async payload => postRequest(groupsSearchUrl, payload);
    const deleteGroupWithSnippets = async id => deleteRequest(groupsUrl, id);

    return {
        createGroup,
        createSnippet,
        searchGroup,
        deleteGroupWithSnippets
    }

};

module.exports = codypasteServiceClient;