import { Layout } from 'antd'
import { Component } from 'react'

import ListOfFilms from '../list-of-films'
import HeaderSearch from '../search'
import PaginationFooter from '../footer'
import GetFilms from '../../services/get-films'

const { Footer, Content } = Layout
export default class TabSearch extends Component {
  state = {
    films: null,
    loading: true,
    error: false,
    page: 1,
    text: undefined,
    noMatches: false,
  }

  componentDidMount() {
    const { films, text, page } = this.state
    if (films == null) {
      this.updateFilms(text, page)
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  handleKeyUp = (event) => {
    this.setState({
      text: event.target.value,
      page: 1,
    })
    this.updateFilms(event.target.value, 1)
  }

  clickPagination = (event) => {
    const { text } = this.state
    const p = event.target.textContent
    this.setState({
      page: 1,
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
          page,
        })
      })

      .catch(this.onError)
  }

  render() {
    const { guestSessionId, addRatingFilm } = this.props
    const { films, loading, error, page, noMatches } = this.state
    return (
      <>
        <Content className="content">
          <HeaderSearch handleKeyUp={this.handleKeyUp} />
          <ListOfFilms
            films={films}
            loading={loading}
            error={error}
            noMatches={noMatches}
            guestSessionId={guestSessionId}
            addRatingFilm={addRatingFilm}
          />
        </Content>
        <Footer className="footerStyle" page={page} onClick={this.clickPagination}>
          <PaginationFooter />
        </Footer>
      </>
    )
  }
}
