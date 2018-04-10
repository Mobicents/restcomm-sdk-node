var nock = require("nock"),
  should = require("should");

var testData = require('./data');
var endpointPath = "/";

module.exports = function (client) {

  describe("Accounts", function () {

    before(function () {
      nock(client.baseUrl)
        .persist()
        .get(endpointPath)
        .reply(200, testData.array);
      nock(client.baseUrl)
        .persist()
        .post(endpointPath)
        .reply(200, testData.one);
      nock(client.baseUrl)
        .persist()
        .get(endpointPath + testData.sid)
        .reply(200, testData.one);
      nock(client.baseUrl)
        .persist()
        .get(endpointPath + testData.emailAddress)
        .reply(200, testData.one);
      nock(client.baseUrl)
        .persist()
        .put(endpointPath + testData.sid)
        .reply(200, testData.one);
      nock(client.baseUrl)
        .persist()
        .put(endpointPath + testData.emailAddress)
        .reply(200, testData.one);
    });


    it("should return list sub-accounts", function (done) {
      return client.accounts.all().then(function (res) {
        res.should.eql(testData.array);
        done();
      });
    });

    it("should create new sub-account", function (done) {
      return client.accounts.create(testData.createOneSuccess).then(function (res) {
        res.should.eql(testData.one);
        done();
      });
    });
    it("should not create new sub-account", function (done) {
      return client.accounts.create(testData.createOneError).then(function (res) {}).catch(function (error) {
        error.statusCode.should.eql(404);
        return done()
      });
    });

    it("should return one for sid", function (done) {
      return client.accounts.get({
        Sid: testData.sid
      }).then(function (res) {
        res.should.eql(testData.one);
        done();
      });
    });
    it("should return one for email", function (done) {
      return client.accounts.get({
        EmailAddress: testData.emailAddress
      }).then(function (res) {
        res.should.eql(testData.one);
        done();
      });
    });

    it("should return none for sid", function (done) {
      return client.accounts.get(testData.invalidSid).then(function (res) {
        should.not.exist(res);
        done();
      });
    });

    it("should update password using account sid", function (done) {
      return client.accounts.update({
        Sid: testData.sid,
        Password: 'newPasword'
      }).then(function (res) {
        res.should.eql(testData.one);
        done();
      });
    });

    it("should update password using account email", function (done) {
      return client.accounts.update({
        EmailAddress: testData.emailAddress,
        Password: 'newPasword'
      }).then(function (res) {
        res.should.eql(testData.one);
        done();
      });
    });

    it("should not update account", function (done) {
      return client.accounts.update({
        Sid: testData.invalidSid
      }).then(function (res) {}).catch(function (error) {
        error.statusCode.should.eql(404);
        return done()
      });
    })
    it("should close sub-account", function (done) {
      return client.accounts.update({
        Sid: testData.sid,
        Status: 'closed'
      }).then(function (res) {
        res.should.eql(testData.one);
        done();
      });
    });
  });


}