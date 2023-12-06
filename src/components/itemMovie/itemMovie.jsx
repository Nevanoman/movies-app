import { Component } from 'react'
import { Card, Flex, Typography } from 'antd'
import './itemMovie.css'
import { format } from 'date-fns'

import StarRating from '../starRating'
import imageSrc from '../../error-img.png'

export default class ItemMovie extends Component {
  trimText(text, title) {
    if (title) {
      if (text.split('').length > 21) {
        const newTrimText = `${text.slice(0, 21).split(' ').slice(0).join(' ')}...`
        return newTrimText
      }
    }
    if (text.split('').length > 99) {
      const newTrimText = `${text.slice(0, 99).split(' ').slice(0, -3).join(' ')}...`
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

  addGenres(genres, genre) {
    const arr = []
    for (let i = 0; i < genre.length; i++) {
      if (genre[i].name) {
        arr.push(genre[i].name)
      } else {
        for (let j = 0; j < genres.genres.length; j++) {
          if (genre[i] === genres.genres[j].id) {
            arr.push(genres.genres[j].name)
          }
        }
      }
    }
    return arr
  }

  render() {
    const { title, text, img, releaseDate, voteAverage, guestSessionId, genre, genres, id, addRatingFilm, rated } =
      this.props
    const newText = this.trimText(text)
    const newData = this.formattingDate(releaseDate)
    const newTitle = this.trimText(title, title)
    let newGenreRender = null

    if (genres) {
      const newGenre = this.addGenres(genres, genre)
      newGenreRender = newGenre.map((g) => (
        <div className="genreButton" key={`${Math.random() * 10}2`}>
          {g}
        </div>
      ))
    }

    return (
      <Card
        hoverable
        className="itemMovie"
        bodyStyle={{
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <Flex justify="flex-start" align="flex-start" className="itemMovie-img-flex">
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
              {newTitle}
            </Typography.Title>
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
              {newGenreRender}
            </Flex>
            <div className="itemMovie-text">{newText}</div>
            <StarRating
              voteAverage={voteAverage}
              guestSessionId={guestSessionId}
              id={id}
              addRatingFilm={addRatingFilm}
              rated={rated}
            />
          </Flex>
        </Flex>
      </Card>
    )
  }
}
