import axios from "axios";

export const userCart = async (authToken, cart) => {
  return await axios.post(process.env.REACT_APP_API_URL + "user/cart", cart, {
    headers: {
      authToken,
    },
  });
};

export const getUserCart = async (authToken) => {
  return await axios.get(process.env.REACT_APP_API_URL + "user/cart", {
    headers: {
      authToken,
    },
  });
};

export const emptyCart = async (authToken) => {
  return await axios.delete(process.env.REACT_APP_API_URL + "user/cart", {
    headers: {
      authToken,
    },
  });
};

export const saveAddress = async (authToken, address) => {
  return await axios.post(
    process.env.REACT_APP_API_URL + "user/address",
    address,
    {
      headers: {
        authToken,
      },
    }
  );
};
