import { Component } from 'react'
import { Card, Flex, Typography, Rate } from 'antd'
import './item-movie.css'
import { format } from 'date-fns'

import imageSrc from '../../error-img.png'

export default class ItemMovie extends Component {
  trimText(text) {
    if (text.split('').length > 140) {
      const newTrimText = `${text.slice(0, 140).split(' ').slice(0, -3).join(' ')}...`
      return newTrimText
    }
    return text
  }

  formattingDate(date) {
    if (date !== '') {
      const arrData = date.split('-')
      return format(new Date(++arrData[0], ++arrData[1], ++arrData[2]), 'LLL d, yyyy')
    }
    return null
  }

  render() {
    const { title, text, img, releaseDate } = this.props
    const newText = this.trimText(text)
    const newData = this.formattingDate(releaseDate)
    return (
      <Card
        hoverable
        className="itemMovie"
        bodyStyle={{
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <Flex justify="flex-start" align="flex-start">
          <img
            alt="avatar"
            src={img ? `https://image.tmdb.org/t/p/original${img}` : imageSrc}
            className="itemMovie-img"
          />
          <Flex
            vertical
            align="flex-start"
            justify="flex-start"
            style={{
              padding: 20,
            }}
          >
            <Typography.Title level={5} className="title">
              {title}
            </Typography.Title>
            <div className="rating" />
            <div className="numberRating">2</div>
            <div className="itemMovie-date">{newData}</div>
            <Flex
              vertical-wrap="wrap"
              gap="small"
              align="flex-start"
              justify="flex-start"
              style={{
                padding: 0,
              }}
            >
              <div className="genreButton">Action</div>
              <div className="genreButton">Drama</div>
            </Flex>
            <div className="itemMovie-text">{newText}</div>
            <Rate disabled defaultValue={2} />
          </Flex>
        </Flex>
      </Card>
    )
  }
}
