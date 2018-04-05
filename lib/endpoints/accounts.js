var Accounts = function (client) {
  this.client = client;
};

Accounts.prototype.get = function(sid){
  return this.client.makeRequest({accountSid : sid}).then(function(response){
    return Promise.resolve(response.body)
  }).catch(function(){return Promise.resolve()});
};

Accounts.prototype.all = function(){
  return this.client.makeRequest({accountSid : ''}).then(function(response){return Promise.resolve(response.body)});
};

module.exports = Accounts;