import Realm from "realm";

class UserSettings extends Realm.Object {}
UserSettings.schema = {
  name: "UserSettings",
  primaryKey: "key",
  properties: {
    key: { type: "string" },
    date: { type: "date", default: new Date(), optional: true },
    value: {type: "string", default: null, optional: true },
    description: { type: "string", default: null, optional: true }
  }
};

export default UserSettings;
