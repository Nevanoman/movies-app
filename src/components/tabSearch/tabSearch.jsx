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
    text: null,
    noMatches: false,
  }

  componentDidMount() {
    const { films } = this.state
    if (films == null) {
      this.updateFilms()
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
    // eslint-disable-next-line no-console
    console.log(guestSessionId, 'TabSearch')
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
          />
        </Content>
        <Footer className="footerStyle" page={page} onClick={this.clickPagination}>
          <PaginationFooter />
        </Footer>
      </>
    )
  }
}
