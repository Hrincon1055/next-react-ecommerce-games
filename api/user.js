import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
// Funcion para crear un nuevo usuario en strapi
export async function registerApi(formData) {
  try {
    const url = `${BASE_PATH}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Funcion que logue un usuario en strapi
export async function loginApi(formData) {
  try {
    const url = `${BASE_PATH}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Funcion para recuperar contraseña
export async function resetPasswordApi(email) {
  try {
    const url = `${BASE_PATH}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Funcion para obtener los datos del usuario logueado
export async function getMeApi(logout) {
  try {
    const url = `${BASE_PATH}/users/me`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}
// Funcion que actualiza el nombre del usuario
export async function updateNameApi(idUser, data, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(params);
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Funcion que actualiza el email
export async function updateEmailApi(idUser, email, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Funcion que actualiza la contraseña
export async function updatePasswordApi(idUser, password, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
