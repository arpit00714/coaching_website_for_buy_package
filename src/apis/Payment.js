import { appuri } from "../appUri/appUri";

export const RazorPay = async (data) => {
    try {
      const response = `${appuri}razorpay/create-order`;
      const resp = await fetch(response, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return resp;
    } catch (err) {
      console.log("Err", err);
    }
  };


export const paymentCallback = async (data) => {
    try {
      const response = `${appuri}razorpay/payment-callback`;
      const resp = await fetch(response, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return resp;
    } catch (err) {
      console.log("Err", err);
    }
  };
  