import Realm from "realm";

class PaymentModel extends Realm.Object {}
PaymentModel.schema = {
  name: "PaymentModel",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    description: { type: "string", default: null, optional: true },
    name: { type: "string", default: null, optional: true },
    amount: { type: "string", default: null },
    original_amount: { type: "string", default: null },
    coupon_discount: { type: "string", default: null },
    due_date: { type: "date", default: null, optional: true },
    currency: { type: "string", default: null, optional: true }
  }
};

export default PaymentModel;
