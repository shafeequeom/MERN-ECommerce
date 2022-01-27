import axios from "axios";

export const addProduct = async (form, authToken) => {
  return await axios.post(process.env.REACT_APP_API_URL + "product", form, {
    headers: {
      authToken,
    },
  });
};
