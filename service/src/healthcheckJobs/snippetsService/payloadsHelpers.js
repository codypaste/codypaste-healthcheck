const cryptoRandomString = require('crypto-random-string');
 
const groupCreatePayload = (title = cryptoRandomString(10)) => ({
    title,
    expirationDatetime: null
});

const snippetCreatePayload = groupID => ({
    snippet: cryptoRandomString(40),
    group: groupID,
    author: 'Healthcheck service',
    snippetName: 'Healthcheck service test snippet',
    syntax: 'Plain Text',
});

const groupSearchPayload = id => ({ groupId: id });

module.exports = {
    groupCreatePayload,
    snippetCreatePayload,
    groupSearchPayload
};