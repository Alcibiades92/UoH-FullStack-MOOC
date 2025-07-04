import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export default { getAllUsers, createUser }
