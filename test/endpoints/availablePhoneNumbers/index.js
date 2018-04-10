var nock = require("nock"),
    should = require("should");

var testData = require('./data');
var defaultIsoCountry = "US"
var endpointPath = "/AvailablePhoneNumbers/";
var defaultIsoCountry = testData.isoCountryDefault +"/Local";
var secondIsoCountry = testData.isoCountryDefault +"/Local";
module.exports = function (client) {

    describe("AvailablePhoneNumbers", function () {

        before(function () {
            nock(client.baseUrl + "/fakeAccountSid")
                .persist()
                .get(endpointPath + defaultIsoCountry)
                .reply(200, testData.arrayDefault);
            nock(client.baseUrl + "/fakeAccountSid")
                .persist()
                .get(endpointPath + secondIsoCountry)
                .reply(200, testData.arraySecond);
        });

        it("should return array with default IsoCountry(US)", function (done) {
            return client.availablePhoneNumbers.get().then(function (res) {
                res.should.eql(testData.arrayDefault);
                done();
            });
        });
        it("should return array with different IsoCountry(DE)", function (done) {
            return client.availablePhoneNumbers.get().then(function (res) {
                res.should.eql(testData.arraySecond);
                done();
            });
        });
    });

}