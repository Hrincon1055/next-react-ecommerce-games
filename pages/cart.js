import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/basicLayout";
import { getGameByUrlApi } from "../api/game";
import useCart from "../hooks/useCart";
import SummaryCart from "../components/cart/summaryCart";
import AddressShipping from "../components/cart/addressShipping";
import Payment from "../components/cart/payment";
// Inicio
export default function Cart() {
  // constantes
  const { getProductsCart } = useCart();
  const products = getProductsCart();
  return !products ? <EmptyCart /> : <FullCart products={products} />;
}
// Componentes internos
function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </BasicLayout>
  );
}
function FullCart(props) {
  // props
  const { products } = props;
  // state
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [address, setAddress] = useState(null);
  // effect
  useEffect(() => {
    (async () => {
      const productosTemp = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productosTemp.push(data);
      }
      setProductsData(productosTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);
  return (
    <BasicLayout className="full-cart">
      <SummaryCart
        products={productsData}
        setReloadCart={setReloadCart}
        reloadCart={reloadCart}
      />
      <AddressShipping setAddress={setAddress} />
      {address && <Payment products={productsData} address={address} />}
    </BasicLayout>
  );
}
