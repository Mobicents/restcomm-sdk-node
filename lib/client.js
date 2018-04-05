var Promise                 = require("bluebird");
var request                 = Promise.promisify(require("request"));
var _                       = require("lodash");
var UnexpectedResponseError = require("./unexpectedResponseError");
var packageInfo             = require("./../package.json");
var Accounts                = require("../lib/endpoints/accounts");
var Clients                = require("../lib/endpoints/clients");

var _defaults = {
  baseUrl: "https://cloud.restcomm.com/restcomm/2012-04-24/Accounts"
};

var Client = function (config) {
  config = _.merge({}, _defaults, config);

  var handleResponse = function (response) {
    if (response.statusCode !== 200 && response.statusCode !== 201 && response.statusCode !== 202) {
      var message = "";
      if (response.body) {
        message = response.body.message || "";
      }
      throw new UnexpectedResponseError(message, response.statusCode);
    }
    return response;
  };

  function getUserAgentHeader() {
    return packageInfo.name + "-v" + packageInfo.version;
  }

  function createRequestOptions(params) {
    return {
      url: config.baseUrl + "/" + (params.accountSid !== undefined ? params.accountSid : config.accountSid) +
        (params.path ? "/" + params.path : ""),
      headers: {
        "User-Agent": getUserAgentHeader(),
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(params.body || "")
      },
      qs: params.qs,
      method: params.method || "GET",
      auth: {
        user: config.accountSid,
        pass: config.authToken
      },
      rejectUnauthorized: false,
      json: true,
      encoding: params.encoding || undefined
    };
  }

  this.makeRequest          = function (params) {
    return request(createRequestOptions(params)).then(handleResponse);
  };
  this.baseUrl = config.baseUrl;

  this.createRequestOptions = createRequestOptions;
  this.handleResponse       = handleResponse;

  this.accounts = new Accounts(this);
  this.clients = new Clients(this);
};

module.exports = Client;
