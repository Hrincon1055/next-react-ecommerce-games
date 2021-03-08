import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import BasicLayout from "../layouts/basicLayout";
import { getOrdersApi } from "../api/orders";
import useAuth from "../hooks/useAuth";
import Order from "../components/order/";
import Seo from "../components/Seo";
// Inicio
export default function Orders() {
  // state
  const [orders, setOrders] = useState(null);
  // constantes
  const { auth, logout } = useAuth();
  // effect
  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      setOrders(response || []);
    })();
  }, []);
  return (
    <BasicLayout className="orders">
      <Seo title="Mis pedidos" description="Listado de tus pedidos" />
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              Todavía no has realizado ninguna compra
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}
// componentes internos
function OrderList(props) {
  // props
  const { orders } = props;

  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column mobile={16} table={6} computer={8}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  );
}
