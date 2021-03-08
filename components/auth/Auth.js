import React, { useState } from "react";
import LoginForm from "../auth/loginForm";
import RegisterForm from "../auth/registerForm";
// Inicio
export default function Auth(props) {
  const { onCloseModal, setTitleModal } = props;
  const [showLogin, setShowLogin] = useState(true);

  // Funciones del Componente
  const showLoginForm = () => {
    setTitleModal("Iniciar Sesión");
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setTitleModal("Crear nuevo usuario");
    setShowLogin(false);
  };

  return showLogin ? (
    <LoginForm
      showRegisterForm={showRegisterForm}
      onCloseModal={onCloseModal}
    />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
