import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, { content: anecdote, votes: 0 })
  return response.data
}

const increaseVote = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, createNew, increaseVote }