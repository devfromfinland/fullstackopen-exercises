import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query getAllAuthors {
  allAuthors {
    id
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query getAllBooks {
  allBooks {
    id
    title
    genres
    author {
      name
      born
    }
    published
  }
}
`

export const BOOK_BY_AUTHOR = gql`
query getBooksByAuthor ($author: String!) {
  allBooks (author: $author) {
    id
    title
    genres
    published
  }
}
`

export const BOOK_BY_GENRE = gql`
query getBooksByGenre ($genre: String!) {
  allBooks (genre: $genre) {
    id
    title
    author {
      name
      born
    }
    published
  }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const UPDATE_AUTHOR =gql`
mutation updateAuthor ($name: String!, $year: Int) {
  editAuthor(name: $name, setBornTo: $year) {
    name
    born
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
    author {
      name
    }
  }
}
`

export const LOGIN = gql`
mutation login ($username: String!, $password: String!) {
  login (
    username: $username,
    password: $password
  ) {
    value
    user {
      username
      favoriteGenre
    }
  }
}
`

export const CREATE_USER = gql`
mutation createUser ($username: String!, $favoriteGenre: String!) {
  addUser (
    username: $username,
    favoriteGenre: $favoriteGenre
  ) {
    username,
    favoriteGenre
  }
}
`