import React from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../../queries'

class BookDetails extends React.Component {
  renderAuthor() {
    const { author } = this.props.data.book
    if (!author) {
      return
    }

    const { name, books } = author
    return (
      <div>
        <p>{name}</p>
        <p>From this author</p>
        <ul>
          {author && books.map(({ id, name }) => <li key={id}>{name}</li>)}
        </ul>
      </div>
    )
  }

  render() {
    if (!this.props.bookId) {
      return null
    }

    if (this.props.data.loading) {
      return (
        <div className='book-details'>
          <p>Loading</p>
        </div>
      )
    }

    const { name, genre } = this.props.data.book

    return (
      <div className='book-details'>
        <h6>{name}</h6>
        <p>{genre}</p>
        {this.renderAuthor()}
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId,
      },
    }
  },
})(BookDetails)
