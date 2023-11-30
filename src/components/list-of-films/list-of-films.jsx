import { Component } from 'react'
import { Row, Spin, Image, Typography } from 'antd'

import ItemMovie from '../item-movie'
import './list-of-films.css'
import ErrorIndicator from '../error-indicator'
import heHe from '../app/he-he.jpg'

export default class ListOfFilms extends Component {
  render() {
    const { films, error, loading, noMatches } = this.props
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
    if (noMatches) {
      return (
        <div>
          <Typography.Title level={3} className="title">
            Nothing was found for your request
          </Typography.Title>
          <Image width={500} src={heHe} className="he-he" />
        </div>
      )
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
            voteAverage={film.vote_average}
          />
        ))}
      </Row>
    )
  }
}
