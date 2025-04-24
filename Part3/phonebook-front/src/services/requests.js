import axios from "axios";
const baseUrl = "/api/persons";
const add = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const deletion = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);

  return request.then((response) => response);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
export default {
  add,
  getAll,
  deletion,
  update,
};
