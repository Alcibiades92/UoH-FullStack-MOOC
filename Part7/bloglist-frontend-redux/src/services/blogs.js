import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null
}

const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data.sort((a, b) => b.likes - a.likes)
}

const create = async (newObject) => {
  console.log(token, 123)
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const updateLikes = async (id, newObject) => {
  const response = await axios.patch(`${baseUrl}/${id}`, newObject)
  return response.data
}

const deleteOne = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const createComment = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  console.log(response.data)
  return response.data
}

export default {
  getAll,
  setToken,
  create,
  update,
  deleteOne,
  createComment,
  updateLikes,
}
