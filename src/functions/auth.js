import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    process.env.REACT_APP_API_URL + "user",
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post(
    process.env.REACT_APP_API_URL + "user/current",
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
