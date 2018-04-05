var  path = 'Clients/';

var Clients = function (client) {
  this.client = client;
};

Clients.prototype.all = function(){
  return this.client.makeRequest({path: path}).then(function(response){
    return Promise.resolve(response.body)
  });
};

Clients.prototype.get = function(sid){
  return this.client.makeRequest({path: path + sid}).then(function(response){return Promise.resolve(response.body)})
    .catch(function(){return Promise.resolve()});
};

Clients.prototype.create = function(data){
  return this.client.makeRequest({method: 'POST', path: path, body: JSON.stringify(data)}).then(function(response){return Promise.resolve(response.body)});
};

Clients.prototype.update = function(sid, data){
  return this.client.makeRequest({method: 'PUT', path: path + sid, body: JSON.stringify(data)}).then(function(response){return Promise.resolve(response.body)});
};

Clients.prototype.delete = function(sid){
  return this.client.makeRequest({method: 'DELETE', path: path + sid}).then(function(response){return Promise.resolve(response.body)});
};

module.exports = Clients;