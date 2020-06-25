import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, { content: anecdote, votes: 0 })
  return response.data
}

const increaseVote = async (id) => {
  const anecdote = await getOne(id)
  const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

export default { getAll, createNew, increaseVote }