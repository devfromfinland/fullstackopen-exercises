import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (id, updateData) => {
  // updatedData { title, author, url, likes }
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updateData, config)
  return response.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrl}/${id}/comments`, comment, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, update, remove, getOne, addComment }