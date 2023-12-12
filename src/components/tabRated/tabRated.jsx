import { Layout, Image, Typography } from 'antd'
import { Component } from 'react'

import ListOfFilms from '../list-of-films'
import GetFilms from '../../services/get-films'
import './tabRated.css'
import heHe from '../../assets/he-he.jpg'

const { Content } = Layout
export default class TabRated extends Component {
  state = {
    loading: true,
    films: null,
  }

  componentDidMount() {
    this.getRatedFilms()
  }

  getRatedFilms() {
    const filmsId = localStorage.getItem('ratingMovies')
    if (filmsId) {
      this.addFilms(this.removeDuplicates(JSON.parse(filmsId)))
    }
  }

  removeDuplicates(arr) {
    const set = new Set(arr)
    return [...set]
  }

  addFilms(filmsId) {
    const getFilms = new GetFilms()
    getFilms
      .getMovies(filmsId)
      .then((res) => {
        this.setState({
          films: res,
          loading: false,
        })
      })

      .catch(this.onError)
  }

  render() {
    const { films, loading } = this.state
    if (!films) {
      return (
        <div className="container">
          <Typography.Title level={3} className="title">
            There is nothing here
          </Typography.Title>
          <Image width={500} src={heHe} className="he-he" />
        </div>
      )
    }
    return (
      <Content className="content">
        <ListOfFilms films={films} loading={loading} />
      </Content>
    )
  }
}
