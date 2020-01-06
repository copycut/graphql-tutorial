import React from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../../queries'
import BookDetails from '../BookDetails/BookDetails'
import './BookList.css'

class BookList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedBook: null,
    }
  }
  selectBook(id) {
    this.setState({ selectedBook: id })
  }

  renderBooks() {
    const { loading, books } = this.props.data

    if (loading) {
      return 'Loading'
    }

    if (!books) {
      return 'No books availables'
    }

    return (
      <>
        <h1 className='books-title'>Books</h1>

        <BookDetails bookId={this.state.selectedBook} />

        <ul className='list'>
          {books.map(({ id, name, genre, author }) => (
            <li
              className='list-item'
              key={id}
              onClick={() => this.selectBook(id)}>
              <span className='title'>{name}</span>
              <span className='meta'>
                <span className='author'>{author && author.name}</span>
                <span className='genre'>{genre}</span>
              </span>
            </li>
          ))}
        </ul>
      </>
    )
  }

  render() {
    return <div className='books'>{this.renderBooks()}</div>
  }
}

export default graphql(getBooksQuery)(BookList)
