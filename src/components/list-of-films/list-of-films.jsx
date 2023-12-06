import { Component } from 'react'
import { Row, Spin, Image, Typography } from 'antd'

import ItemMovie from '../itemMovie'
import './list-of-films.css'
import ErrorIndicator from '../error-indicator'
import heHe from '../app/he-he.jpg'
import { Consumer } from '../genres-context/genres-context'

export default class ListOfFilms extends Component {
  getRated(id) {
    const rated = localStorage.getItem(id)
    return rated
  }

  render() {
    const { films, error, loading, noMatches, guestSessionId, addRatingFilm } = this.props
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
      <Consumer>
        {(genres) => (
          <Row justify="space-evenly">
            {films.map((film) => (
              <ItemMovie
                key={film.id}
                id={film.id}
                title={film.original_title}
                text={film.overview}
                img={film.poster_path}
                releaseDate={film.release_date}
                voteAverage={film.vote_average}
                guestSessionId={guestSessionId}
                genre={film.genre_ids || film.genres}
                genres={genres}
                addRatingFilm={addRatingFilm}
                rated={this.getRated(film.id)}
              />
            ))}
          </Row>
        )}
      </Consumer>
    )
  }
}
