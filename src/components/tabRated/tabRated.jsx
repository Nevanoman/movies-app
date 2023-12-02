import { Layout } from 'antd'
import { Component } from 'react'

import ListOfFilms from '../list-of-films'
import PaginationFooter from '../footer'
import Rating from '../../services/rating'

const { Footer, Content } = Layout
export default class TabRated extends Component {
  state = {
    films: null,
    loading: true,
    error: false,
    page: 1,
    noMatches: false,
  }

  componentDidMount() {
    const { guestSessionId } = this.props
    // eslint-disable-next-line no-console
    console.log(guestSessionId, 'TabRated')
    const addRating = new Rating()
    addRating
      .geRatedFilms(guestSessionId)
      .then((p) => {
        // eslint-disable-next-line no-console
        console.log(p)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Не удалось отобразить рейтинговые фильмы', error)
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

  render() {
    const { films, loading, error, page, noMatches } = this.state
    return (
      <>
        <Content className="content">
          <ListOfFilms films={films} loading={loading} error={error} noMatches={noMatches} />
        </Content>
        <Footer className="footerStyle" page={page} onClick={this.clickPagination}>
          <PaginationFooter />
        </Footer>
      </>
    )
  }
}
