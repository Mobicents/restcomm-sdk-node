var nock   = require("nock");
var Client = require("../lib/client");

var client;

describe("RestCommClient", function () {

    before(function () {
        nock.disableNetConnect();
    });

    after(function () {
        nock.enableNetConnect();
    });

    describe("testing endpoints", function () {
        var client;

        before(function () {
            client = new Client({
                accountSid: "fakeAccountSid",
                authToken: "fakeAuthToken",
                baseUrl: "https://cloud.restcomm.com/restcomm/2012-04-24/Accounts"
            });
        });

        after(function () {
            nock.cleanAll();
        });

        it("should test all endpoints", function (done) {
            require("./endpoints/clients")(client);
            require("./endpoints/accounts")(client);
            done();
        });

    });
});
