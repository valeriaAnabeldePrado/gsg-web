const { BASE_URL } = require("./constants");
//común
export const getDataTipos = async (tipo) => {
  const res = await fetch(`${BASE_URL}/products/${tipo}`);
  const dataTipo = await res.json();
  console.log(dataTipo);
};
//con query
export const getDataTiposQuery = async (tipo) => {
  try {
    const res = await fetch(`${BASE_URL}/products/querys?categoria=${tipo}`);
    if (!res.ok) {
      throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
    }
    const dataTipo = await res.json();
    // console.log(dataTipo);
  } catch (error) {
    console.error(`Hubo un problema al obtener los datos: ${error.message}`);
  }
};
