import realm from "../../../models";
import axios from "axios";
import { PAYMENT_HISTORY } from "../../../variables";

export const loadPaymentsFromRealm = () => {
  return {
    type: "payment_history_reload"
  };
};

export const fetchPaymentsFromServer = (
  payload,
  url = PAYMENT_HISTORY(payload.user_id)
) => {
  return (dispatch, getState) => {
    var success = true;
    axios

      .get(url)
      .then(response => {
        console.log("The RESPONSE in PAYMEMT_HISTORY IS: ", response);

        var response_data = response.data;
        var data = response_data.results;
        var next_url = response_data.next;
        var previous_url = response_data.previous;
        var count = response_data.count;

        console.log("The DATA in PAYMEMT_HISTORY IS: ", data);

        for (var data_index in data) {
          var row = data[data_index];

          if (row.currency == null) {
            // to check if the currency is null and not saving it in realm as null
            var currency = "USD";
          } else {
            var currency = row.currency;
          }

          let obj_to_be_inserted = {
            id: String(row.id),
            name: String(row.pricing_plan) || "",
            amount: String(row.paid_amount) || "",
            due_date: String(row.paid_date) || "",
            original_amount: String(row.original_amount) || "",
            coupon_discount: String(row.coupon_discount) || "",
            currency: String(currency) || ""
          };

          try {
            realm.write(() => {
              // console.log("creating", obj_to_be_inserted);
              realm.create(
                "PaymentModel",
                obj_to_be_inserted,
                true // check if it its laready inserted otherwise update
              );
            });
          } catch (e) {
            success = false;
            console.log("error payments", e);
          }
        }
        if (next_url != null) {
          url = next_url;

          dispatch(fetchPaymentsFromServer(url));
        } else {
          dispatch({
            type: "payment_history_reload"
          });
        }
      })
      .catch(error => {
        console.log("error request payments", error);
      })
      .then(() => {
        if (success) {
          // after all is finished we will dispatch an action in order to force the state refresh
          dispatch({
            type: "refresh_user_goal_payment"
          });

          // now save the payments to the redux store
          dispatch({
            type: "payment_history_reload"
          });
        }
      });
  };
};
