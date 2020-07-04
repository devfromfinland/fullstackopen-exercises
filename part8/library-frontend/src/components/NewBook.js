import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    onError: error => [
      console.log(error.graphQLErrors[0].message)
    ],
    update: (cache, response) => {
      // console.log('response data', response.data)
      const cacheData = cache.readQuery({ query: ALL_BOOKS })
      // console.log('cacheData', cacheData)
      
      cache.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...cacheData,
          allBooks: [
            ...cacheData.allBooks,
            response.data.addBook
          ]
        }
      })

      // need to update author (countBooks) as well
      const cacheData2 = cache.readQuery({ query: ALL_AUTHORS })
      // console.log('cacheData2', cacheData2)

      let updatedAuthor = cacheData2.allAuthors.find(item => item.name === response.data.addBook.author.name)

      console.log('updatedAuthor', updatedAuthor)

      cache.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...cacheData2,
          allAuthors: updatedAuthor
            ? cacheData2.allAuthors.map(item => item.name === response.data.addBook.author.name
                ? { ...updatedAuthor, bookCount: updatedAuthor.bookCount + 1 }
                : item
              )
            : [
            ...cacheData2.allAuthors,
            { name: response.data.addBook.author, bookCount: 1 }
          ]
        }
      })
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log(title, published, author, genres)
    const sth = await createBook({ variables: { title, published: parseInt(published), author, genres }})
    console.log('returned value', sth)

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook