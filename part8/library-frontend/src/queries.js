import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    id
    name
    born
    bookCount
  }
}
`

// export const GET_AUTHOR_BY_NAME = gql`
// query {
  
// }
// `

export const UPDATE_AUTHOR =gql`
mutation updateAuthor ($name: String!, $year: Int) {
  editAuthor(name: $name, setBornTo: $year) {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    id
    title
    author
    published
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook ($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
  }
}
`