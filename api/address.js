import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
// Funcion para crear una nueva dirección para el usuario
export async function createAddressApi(address, logout) {
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Funcion para obtener todas las direcciones del usuario
export async function getAddressesApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/addresses?users=${idUser}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw "Error del servidor";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Funcion para eliminar una direccion
export async function deleteAddressApi(idAddress, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) throw "Error del servidor";
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
// Funcion para editar una direccion
export async function updateAddressApi(idAddress, address, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
