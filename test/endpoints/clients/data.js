var sid   = "fakeClientSid";
var frendlyName = "fakeClientFriendlyName";

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
    Sid: "secondFakeClientSid",
    FriendlyName: "secondFakeClientFriendlyName"
  }
];