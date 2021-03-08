import { BASE_PATH } from "../utils/constants";
// Funcion para obtener las plataformas
export async function getPlatformApi() {
  try {
    const url = `${BASE_PATH}/platforms?_sort=position:desc`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
