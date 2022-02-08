import axios from "axios";

export const addProduct = async (form, authToken) => {
  return await axios.post(process.env.REACT_APP_API_URL + "product", form, {
    headers: {
      authToken,
    },
  });
};

export const getProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}products/${count}`);
};

export const removeProduct = async (slug, authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL}product/${slug}`, {
    headers: {
      authToken,
    },
  });
};

export const getProduct = async (slug, authToken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}product/${slug}`, {
    headers: {
      authToken,
    },
  });
};

export const updateProduct = async (slug, form, authToken) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}product/${slug}`,
    form,
    {
      headers: {
        authToken,
      },
    }
  );
};
