/* eslint-disable no-console */
import { Layout, Space, Image } from 'antd'
import { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'

import './app.css'

import TabSearch from '../tabSearch'
import TabRated from '../tabRated'
import TabsHeader from '../tabs'
import GuestSession from '../../services/guest-session'

import imgOops from './1.jpg'

const { Sider, Header } = Layout

export default class App extends Component {
  state = {
    tab: 'Search',
    guestSessionId: null,
  }

  componentDidMount() {
    const { guestSessionId } = this.state
    if (!guestSessionId) {
      this.createGuestSession()
    }
  }

  clickTab = (event) => {
    const newTab = event
    this.setState({
      tab: newTab,
    })
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
        console.error('Не удалось создать гостевую сессию:', error)
      })
  }

  render() {
    const { tab, guestSessionId } = this.state
    console.log(guestSessionId, 'App')
    const renderTab =
      tab === 'Search' ? <TabSearch guestSessionId={guestSessionId} /> : <TabRated guestSessionId={guestSessionId} />
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
                  <TabsHeader onClick={this.clickTab} />
                </Header>
                {renderTab}
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
