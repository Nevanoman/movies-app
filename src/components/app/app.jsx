import { Layout, Image } from 'antd'
import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'

import './app.css'

import TabSearch from '../tabSearch'
import TabRated from '../tabRated'
import TabsHeader from '../tabs'
import GuestSession from '../../services/guest-session'
import { Provider } from '../genres-context/genres-context'
import Genres from '../../services/genres'
import imgOops from '../../assets/1.jpg'

const { Sider, Header } = Layout

export default class App extends Component {
  state = {
    tab: 'Search',
    guestSessionId: null,
    ratingMovies: [],
    genres: null,
  }

  componentDidMount() {
    const { guestSessionId } = this.state
    if (!guestSessionId) {
      this.createGuestSession()
      this.getGenres()
    }
    localStorage.clear()
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

  clickTab = (event) => {
    const newTab = event
    this.setState({
      tab: newTab,
    })
  }

  addRatingFilm = (id) => {
    const { ratingMovies } = this.state
    const updatedRatingMovies = [...ratingMovies, id]
    this.setState({
      ratingMovies: updatedRatingMovies,
    })
    localStorage.setItem('ratingMovies', JSON.stringify(updatedRatingMovies))
  }

  createGuestSession() {
    const openSession = new GuestSession()
    openSession
      .getSession()
      .then((id) => {
        this.setState({
          guestSessionId: id.guest_session_id,
        })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Не удалось создать гостевую сессию:', error)
      })
  }

  render() {
    const { tab, guestSessionId, genres } = this.state
    const renderTab =
      tab === 'Search' ? (
        <TabSearch guestSessionId={guestSessionId} addRatingFilm={this.addRatingFilm} />
      ) : (
        <TabRated guestSessionId={guestSessionId} />
      )
    return (
      <div>
        <Online>
          <Layout className="layout">
            <Sider className="siderStyle" />
            <Layout>
              <Header className="headerStyle">
                <TabsHeader onClick={this.clickTab} />
              </Header>
              <Provider value={genres}>{renderTab}</Provider>
            </Layout>
            <Sider className="siderStyle" />
          </Layout>
        </Online>
        <Offline>
          <div className="imgOops-conteiner">
            <Image width={500} src={imgOops} className="imgOops" />
          </div>
        </Offline>
      </div>
    )
  }
}
