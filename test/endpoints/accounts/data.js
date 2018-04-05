var sid   = "fakeAccountSid";
var frendlyName = "fakeAccountFriendlyName";

exports.sid    = sid;
exports.frendlyName  = frendlyName;
exports.one       = {
  Sid: sid,
  FriendlyName: frendlyName
}
exports.array = [
  {
    Sid: sid,
    FriendlyName: frendlyName
  },
  {
    Sid: "secondFakeAccountSid",
    FriendlyName: "secondFakeAccountFriendlyName"
  }
];