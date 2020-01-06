import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import BookList from './components/BookList/BookList'
import AddBook from './components/AddBook/AddBook'
import './App.css'

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URI,
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='app'>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    )
  }
}
