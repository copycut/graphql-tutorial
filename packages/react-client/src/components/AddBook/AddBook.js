import React from 'react'
import { graphql } from 'react-apollo'
import compose from 'lodash.flowright'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../../queries'
import './AddBook.css'

class AddBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    }
  }

  submitForm(event) {
    event.preventDefault()
    const { name, genre, authorId } = this.state
    if (authorId === '') {
      return
    }
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    })

    this.setState({ name: '', genre: '', authorId: '' })
  }

  renderAuthors() {
    const { loading, authors } = this.props.getAuthorsQuery

    if (loading) {
      return <option disabled>Loading authors...</option>
    }

    return authors.map(({ id, name }) => (
      <option key={id} value={id}>
        {name}
      </option>
    ))
  }

  render() {
    const { name, genre, authorId } = this.state

    return (
      <div className='add-book'>
        <form onSubmit={event => this.submitForm(event)}>
          <header>New book</header>
          <fieldset className='fieldset'>
            <label className='label'>Book title</label>
            <input
              type='text'
              value={name}
              onChange={event => this.setState({ name: event.target.value })}
            />
          </fieldset>

          <fieldset className='fieldset'>
            <label className='label'>Book Genre</label>
            <input
              type='text'
              value={genre}
              onChange={event => this.setState({ genre: event.target.value })}
            />
          </fieldset>

          <fieldset className='fieldset'>
            <label className='label'>Book Author</label>
            <select
              value={authorId}
              onChange={event =>
                this.setState({ authorId: event.target.value })
              }>
              <option>Select author</option>
              {this.renderAuthors()}
            </select>
          </fieldset>

          <button className='submit' type='submit'>
            Add
          </button>
        </form>
      </div>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook)
