var nock   = require("nock"),
    should = require("should");

var testData     = require('./data');
var endpointPath = "/Clients/";

module.exports = function (client) {

  describe("Client", function () {

    before(function () {
      nock(client.baseUrl + "/fakeAccountSid")
        .persist()
        .get(endpointPath + testData.sid)
        .reply(200, testData.one);

      nock(client.baseUrl + "/fakeAccountSid")
        .persist()
        .get(endpointPath)
        .reply(200, testData.array);

      nock(client.baseUrl + "/fakeAccountSid")
        .persist()
        .post(endpointPath)
        .reply(200, testData.one);
    });

    it("should create new client", function (done) {
      return client.clients.create({FriendlyName: testData.frendlyName}).then(function (res) {
        res.should.eql(testData.one);
        done();
      });
    });

    it("should return one client for sid", function (done) {
      return client.clients.get(testData.sid).then(function (res) {
        res.should.eql(testData.one);
        done();
      });
    });

    it("should return none client for sid", function (done) {
      return client.clients.get("bad_sid").then(function (res) {
        should.not.exist(res);
        done();
      });
    });

    it("should return all clients", function (done) {
      return client.clients.all().then(function (res) {
        res.should.eql(testData.array);
        done();
      });
    });

  });

}
