import axios from "axios";

const createOrUpdateUser = async (authToken) => {
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

export default createOrUpdateUser;
