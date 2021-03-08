import { toast } from "react-toastify";
import { CART, BASE_PATH } from "../utils/constants";
import { size, includes, remove } from "lodash";
import { authFetch } from "../utils/fetch";
// Funcion para obtener los productos del carrito
export function getProductsCart() {
  const cart = localStorage.getItem(CART);
  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
}
// funcion para agregar productos al carrito
export function addProductCart(product) {
  const cart = getProductsCart();
  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("Producto añadido al carrito");
  } else {
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("Este producto ya esta en el carrito");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("Producto añadido al carito");
    }
  }
}
// Funcion para contar el contenido del carrito
export function countProductsCart() {
  const cart = getProductsCart();
  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}
// Funcion para eleminar un producto del carrito
export function removeProductCart(product) {
  const cart = getProductsCart();
  remove(cart, (item) => {
    return item === product;
  });
  if (size(cart) > 0) {
    localStorage.setItem(CART, cart);
  } else {
    localStorage.removeItem(CART);
  }
}
export async function paymentCartApi(token, products, idUser, address, logout) {
  try {
    const addressShipping = address;
    delete addressShipping.users;
    delete addressShipping.createdAt;

    const url = `${BASE_PATH}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        addressShipping,
      }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function removeAllProductsCart() {
  localStorage.removeItem(CART);
}
