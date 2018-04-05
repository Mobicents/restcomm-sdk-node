var nock   = require("nock"),
    should = require("should");

var testData     = require('./data');
var endpointPath = "/";

module.exports = function (client) {

  describe("Accounts", function () {

    before(function () {
      nock(client.baseUrl)
        .persist()
        .get(endpointPath + testData.sid)
        .reply(200, testData.one);

      nock(client.baseUrl)
        .persist()
        .get(endpointPath)
        .reply(200, testData.array);

    });


    it("should return one for sid", function (done) {
      return client.accounts.get(testData.sid).then(function (res) {
        res.should.eql(testData.one);
        done();
      });
    });

    it("should return none for sid", function (done) {
      return client.accounts.get("bad_sid").then(function (res) {
        should.not.exist(res);
        done();
      });
    });

    it("should return array", function (done) {
      return client.accounts.all().then(function (res) {
        res.should.eql(testData.array);
        done();
      });
    });

  });

}
