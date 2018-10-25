import Realm from "realm";

class CardInfoModel extends Realm.Object {}
CardInfoModel.schema = {
  name: "CardInfoModel",
  primaryKey: "card_id",
  properties: {
    card_id: { type: "string" },
    card_last4: { type: "string", default: null },
    card_brand: { type: "string", default: null },
    card_exp_month: { type: "string", default: null },
    card_exp_year: { type: "string", default: null },
    card_holder: { type: "string", default: null },
    default: { type: "bool", default: false }
  }
};

export default CardInfoModel;
