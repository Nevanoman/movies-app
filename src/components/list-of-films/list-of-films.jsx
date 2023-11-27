import { Component } from 'react'
import { Row, Spin } from 'antd'

import ItemMovie from '../itemMovie'
import './list-of-films.css'
import GetFilms from '../../services/get-films'
import ErrorIndicator from '../error-indicator'

export default class ListOfFilms extends Component {
  state = {
    films: [],
    loading: true,
    error: false,
  }

  componentDidMount() {
    const getFilms = new GetFilms()

    getFilms
      .getAllFilms()
      .then((films) => {
        this.setState({
          films,
          loading: false,
        })
      })
      .catch(this.onError)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  render() {
    const { films, error, loading } = this.state
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
