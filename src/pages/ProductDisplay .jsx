import React, { useState, useEffect } from "react";
import {
  CardElement,
  Elements, //Nos permite usar stripe en componentes(envuelve la raiz)
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; //Carga el componente de stripe asincrono
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51M4x5dDTT0xU9ozoAE2vnZUZbQGOM2G2WCFEIqV4UP3WVEp2oz9Pfryz1Vycu2r5K89juD70ApF3QSffez6E02Jc00Ej9Unrrm"
); //llave publica de stripe (desarrollador - cuenta no activada - pruebas)

const CheckoutForm = () => {
  const stripe = useStripe(); //Es un hook que nos conecta con stripe y hacer acciones
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      const { data } = await axios.post("http://localhost:8800/api/checkout", {
        id,
        amount: 10000,
      });
      console.log(data);
      elements.getElement(CardElement).clear();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-[1240px] mx-auto flex flex-col  "
    >
      <img src="/vite.svg" alt="" width={100} />
      <h2>Price : $100</h2>
      <CardElement />

      <button>Buy</button>
    </form>
  );
};

const ProductDisplay = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default ProductDisplay;
