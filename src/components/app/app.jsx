import { Layout, Space, Image } from 'antd'
import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'

import './app.css'
import ListOfFilms from '../list-of-films'
import HeaderSearch from '../header'
import PaginationFooter from '../footer'
import GetFilms from '../../services/get-films'

import imgOops from './1.jpg'

const { Header, Footer, Sider, Content } = Layout

export default class App extends Component {
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

  handleKeyUp = (event) => {
    this.updateFilms(event.target.value, 1)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
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
        })
      })

      .catch(this.onError)
  }

  render() {
    const { films, loading, error, page, noMatches } = this.state
    return (
      <div>
        <Online>
          <Space
            direction="vertical"
            style={{
              width: '100%',
            }}
            size={[0, 48]}
          >
            <Layout>
              <Sider className="siderStyle" />
              <Layout>
                <Header className="headerStyle">
                  <HeaderSearch handleKeyUp={this.handleKeyUp} />
                </Header>
                <Content className="content">
                  <ListOfFilms films={films} loading={loading} error={error} noMatches={noMatches} />
                </Content>
                <Footer className="footerStyle" page={page} onClick={this.clickPagination}>
                  <PaginationFooter />
                </Footer>
              </Layout>
              <Sider className="siderStyle" />
            </Layout>
          </Space>
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
