import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getAddressesApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
// Inicio
export default function AddressShipping(props) {
  // porps
  const { setAddress } = props;
  // constantes
  const { auth, logout } = useAuth();
  // state
  const [addresses, setAddresses] = useState(null);
  const [addressActive, setAddressActive] = useState(null);
  // effect
  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);
  return (
    <div className="address-shipping">
      <div className="title">Dirección de envio</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay ninguna direccion creada
            <Link href="/account">
              <a>Añadir tu primera direccion </a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address
                  address={address}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddress={setAddress}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}
// Componentes internos
function Address(prosp) {
  // props
  const { address, addressActive, setAddressActive, setAddress } = prosp;
  // Funciones
  const changeAddress = () => {
    setAddressActive(address.id);
    setAddress(address);
  };
  return (
    <div
      className={classNames("address", {
        active: addressActive === address._id,
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state} {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
