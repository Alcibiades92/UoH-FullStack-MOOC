import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null;
  console.log(token);
};

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data.sort((a, b) => b.likes - a.likes);
};

const create = async (newObject) => {
  console.log(token, 123);
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

export default { getAll, setToken, create, update };
