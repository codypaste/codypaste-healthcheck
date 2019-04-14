const cryptoRandomString = require('crypto-random-string');
 
const postGroupPayload = (title = cryptoRandomString(10)) => ({
    title,
    expirationDatetime: null
});

const postSnippetPayload  = groupID => ({
    snippet: cryptoRandomString(40),
    group: groupID,
    author: 'Healthcheck service',
    snippetName: 'Healthcheck service test snippet',
    syntax: 'Plain Text',
});

module.exports = {
    postGroupPayload,
    postSnippetPayload
};