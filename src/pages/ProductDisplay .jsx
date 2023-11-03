import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CardElement,
  Elements, //Nos permite usar stripe en componentes(envuelve la raiz)
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; //Carga el componente de stripe asincrono
import axios from "axios";
import productoAxios from "../config/productoAxios";
import AuthContext from "../hooks/useContext";

const stripePromise = loadStripe(
  "pk_test_51M4x5dDTT0xU9ozoAE2vnZUZbQGOM2G2WCFEIqV4UP3WVEp2oz9Pfryz1Vycu2r5K89juD70ApF3QSffez6E02Jc00Ej9Unrrm"
); //llave publica de stripe (desarrollador - cuenta no activada - pruebas)

const CheckoutForm = () => {
  const [producto, setProducto] = useState({});

  const location = useLocation();

  const { usuario } = useContext(AuthContext);
  console.log(usuario);

  useEffect(() => {
    const consultarProducto = async () => {
      try {
        const { data } = await productoAxios.get(`/${location.state}`);
        setProducto(data);
      } catch (error) {
        console.log(error);
      }
    };
    consultarProducto();
  }, []);

  const stripe = useStripe(); //Es un hook que nos conecta con stripe y hacer acciones
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // const navigate = useNavigate();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      const { data } = await axios.post("http://localhost:8800/api/checkout", {
        id,
        amount: producto?.precio * 100,
        descripcion: producto?.nombre,
        idProducto: producto._id,
        idUsuario: usuario.id,
      });
      elements.getElement(CardElement).clear();
      // navigate(`/mis-compras/${}`)
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-[1240px] mx-auto py-10 bg-white flex">
        <div className="w-full">
          <form onSubmit={handleSubmit} className="w-3/5 mx-auto space-y-5">
            <div>
              {/* <IoBagCheckOutline /> */}
              <h1 className="text-primary text-3xl font-semibold">Checkout</h1>
            </div>
            <hr />
            <h5 className="text-lg font-semibold mb-[-10px]">
              Informacion Personal:
            </h5>
            <div>
              <label htmlFor="nombre" className="block mb-2">
                Nombre:
              </label>
              <input
                type="text"
                placeholder="Nombre"
                id="nombre"
                className="ring-black ring-1 rounded-sm placeholder-gray-300"
              />
            </div>
            <hr />{" "}
            <h5 className="text-lg font-semibold">Informacion de Pago:</h5>
            <CardElement className="w-[300px]" />
            <hr />
            <h5 className="text-lg font-semibold">Politicas de Compra:</h5>
            <div className="flex space-x-2">
              <input type="checkbox" placeholder="" id="politica" />
              <label htmlFor="politica" className="block text-xs text-gray-500">
                Al momento de adquirir el instructivo elegido, no se podra
                descargar para evitar la pirateria, solo con acceso a la
                plataforma podra verlo completo en la seccion Mis Compras
              </label>
            </div>
            <hr />
            <div className="w-full flex justify-center items-center">
              <button className="btn-primary px-20">Buy</button>
            </div>
          </form>
        </div>

        <div className="py-2 px-5 space-y-3 ">
          <h4 className="font-bold text-base ">Resumen de Compra</h4>
          <div className="flex items-center justify-between">
            <img src={producto?.imagen?.secure_url} width={100} />
            <h1> {producto?.nombre}</h1>
            <h2>${producto?.precio * 3}</h2>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <h2>Subtotal:</h2>
            <p className="line-through">${producto?.precio * 3}</p>
            {/* <p>${producto?.precio}</p> */}
          </div>

          <div className="flex items-center justify-between">
            <h2>Descuento:</h2>
            <p>-${producto?.precio * 2}</p>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <h2 className="text-base">Total:</h2>
            <p className="text-lg font-bold ">${producto?.precio}</p>
          </div>
        </div>
      </div>
    </div>
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
