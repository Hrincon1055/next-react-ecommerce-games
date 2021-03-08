import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/basicLayout";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/account/changeNameForm";
import ChangeEmailForm from "../components/account/changeEmailForm";
import ChangePasswordFrom from "../components/account/changePasswordForm";
import BasicModal from "../components/modal/basicModal/";
import AddressForm from "../components/account/addressForm";
import ListAddress from "../components/account/listAddress";
// Inicio
export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);
  if (user === undefined) {
    return null;
  }
  if (!auth && !user) {
    router.replace("/");
    return null;
  }
  return (
    <BasicLayout fluid className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses />
    </BasicLayout>
  );
}
function Configuration(props) {
  const { user, logout, setReloadUser } = props;
  return (
    <div className="account__configuration">
      <div className="title">Configuración</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordFrom user={user} logout={logout} />
      </div>
    </div>
  );
}
function Addresses() {
  // state
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [realodAddresses, setRealodAddresses] = useState(false);
  // Funciones
  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setRealodAddresses={setRealodAddresses}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };
  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones{" "}
        <Icon name="plus" link onClick={() => openModal("Nueva dirección")} />
      </div>
      <div className="data">
        <ListAddress
          realodAddresses={realodAddresses}
          setRealodAddresses={setRealodAddresses}
          openModal={openModal}
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
