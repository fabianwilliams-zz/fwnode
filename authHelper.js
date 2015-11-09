/**
 * Created by fabianwiilliams on 11/9/15.
 */
var AuthenticationContext = require("adal-node").AuthenticationContext;

var credentials = {
    authority: "https://login.microsoftonline.com/common",
    client_id: "62c72ee5-5c6b-4d87-82b2-a2befc366ba0",
    client_secret: "S5NzeQyRZNvWNPbha3StD99HhVpmbjd9gUWiVLOoW24=",
    redirect_url: "http://localhost:3000/login"
};

function getAuthUrl(res) {
    return credentials.authority + "/oauth2/authorize" +
        "?client_id=" + credentials.client_id +
        "&resources=" + res +
        "&response_type=code" +
        "&redirect_uri=" + credentials.redirect_url;
};

function getTokenFromCode(res, code, callback) {
    var authContext = new AuthenticationContext(credentials.authority);
    authContext.acquireTokenWithAuthorizationCode(code, credentials.redirect_url, res, credentials.client_id, credentials.client_secret, function(err, response) {
        if (err)
            callback(null);
        else {
            callback(response);
        }
    });
};

function getTokenFromRefreshToken(res, token, callback) {
    var authContext = new AuthenticationContext(credentials.authority);
    authContext.acquireTokenWithRefreshToken(token, credentials.client_id, credentials.client_secret, res, function(err, response) {
        if (err)
            callback(null);
        else {
            callback(response);
        }
    });
};

exports.getAuthUrl = getAuthUrl;
exports.getTokenFromCode = getTokenFromCode;
exports.getTokenFromRefreshToken = getTokenFromRefreshToken;
exports.TOKEN_CACHE_KEY = 'TOKEN_CACHE_KEY';
exports.TENANT_CAHCE_KEY = 'TENANT_CAHCE_KEY';