import { Layout } from 'antd'
import { Component } from 'react'

import ListOfFilms from '../list-of-films'
import HeaderSearch from '../search'
import PaginationFooter from '../footer'
import GetFilms from '../../services/get-films'
import Genres from '../../services/genres'
import { Provider } from '../genres-context/genres-context'

const { Footer, Content } = Layout
export default class TabSearch extends Component {
  state = {
    films: null,
    loading: true,
    error: false,
    page: 1,
    text: null,
    noMatches: false,
    genres: null,
  }

  componentDidMount() {
    const { films } = this.state
    if (films == null) {
      this.updateFilms()
      this.getGenres()
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  handleKeyUp = (event) => {
    this.updateFilms(event.target.value, 1)
  }

  getGenres() {
    const genres = new Genres()
    genres
      .getGenresFilms()
      .then((obj) => {
        this.setState({
          genres: obj,
        })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Не удалось получить жанры фильмов :', error)
      })
  }

  clickPagination = (event) => {
    const { text } = this.state
    const p = event.target.textContent
    this.setState({
      page: p,
    })
    this.updateFilms(text, p)
  }

  updateFilms(text, page) {
    const getFilms = new GetFilms()
    getFilms
      .getAllFilms(text, page)
      .then((filmsList) => {
        if (filmsList.length === 0) {
          this.setState({
            noMatches: true,
          })
          // eslint-disable-next-line no-console
          console.log('No films found.')
        }
        this.setState({
          films: filmsList,
          loading: false,
          text,
          page: 1,
        })
      })

      .catch(this.onError)
  }

  render() {
    const { guestSessionId } = this.props
    const { films, loading, error, page, noMatches, genres } = this.state
    return (
      <Provider value={genres}>
        <Content className="content">
          <HeaderSearch handleKeyUp={this.handleKeyUp} />
          <ListOfFilms
            films={films}
            loading={loading}
            error={error}
            noMatches={noMatches}
            guestSessionId={guestSessionId}
          />
        </Content>
        <Footer className="footerStyle" page={page} onClick={this.clickPagination}>
          <PaginationFooter />
        </Footer>
      </Provider>
    )
  }
}
