import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FormPayment from "./formPayment";
import { STRIPE_TOKEN } from "../../../utils/constants";
// constantes globales
const stripePromise = loadStripe(STRIPE_TOKEN);
// Inicio
export default function Payment(props) {
  // props
  const { products, address } = props;
  return (
    <div className="payment">
      <div className="title">Pago</div>
      <div className="data">
        <Elements stripe={stripePromise}>
          <FormPayment products={products} address={address} />
        </Elements>
      </div>
    </div>
  );
}
