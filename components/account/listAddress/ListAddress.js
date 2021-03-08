import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import { getAddressesApi, deleteAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
// Inicio
export default function ListAddress(props) {
  // props
  const { realodAddresses, setRealodAddresses, openModal } = props;
  // state
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  // Effect
  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
      setRealodAddresses(false);
    })();
  }, [realodAddresses]);
  // Rederizado
  if (!addresses) {
    return null;
  }
  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay direcciones creadas</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setRealodAddresses={setRealodAddresses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}
function Address(props) {
  // props
  const { address, logout, setRealodAddresses, openModal } = props;
  // state
  const [loadingDelete, setLoadingDelete] = useState(false);
  // Funciones
  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteAddressApi(address._id, logout);
    if (response) setRealodAddresses(true);
    setLoadingDelete(false);
  };
  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalCode}
      </p>
      <p>{address.phone}</p>
      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Editar: ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
