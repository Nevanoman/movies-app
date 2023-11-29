import { Component } from 'react'
import { Row, Spin } from 'antd'

import ItemMovie from '../item-movie'
import './list-of-films.css'
import ErrorIndicator from '../error-indicator'

export default class ListOfFilms extends Component {
  render() {
    const { films, error, loading } = this.props
    if (loading) {
      return (
        <div className="example">
          <Spin size="large" />
        </div>
      )
    }
    if (error) {
      return <ErrorIndicator />
    }
    return (
      <Row justify="space-evenly">
        {films.map((film) => (
          <ItemMovie
            key={film.id}
            title={film.original_title}
            text={film.overview}
            img={film.backdrop_path}
            releaseDate={film.release_date}
          />
        ))}
      </Row>
    )
  }
}
