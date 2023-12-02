import { Rate } from 'antd'
import './starRating.css'
import { Component } from 'react'

import Rating from '../../services/rating'

export default class StarRating extends Component {
  state = {
    rating: null,
  }

  componentDidMount() {
    this.startRating()
  }

  clickAddRating = (event) => {
    const { guestSessionId } = this.props
    // eslint-disable-next-line no-console
    console.log(guestSessionId, 'TabRated')
    // eslint-disable-next-line no-console
    console.log(event * 2)
    this.setState({
      rating: event * 2,
    })

    const addRating = new Rating()
    addRating
      .addRatingFilm(guestSessionId, 238)
      .then((p) => {
        // eslint-disable-next-line no-console
        console.log(p)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Не удалось добавить рейтинг фильма', error)
      })
  }

  startRating() {
    const { voteAverage } = this.props
    this.setState({
      rating: voteAverage.toFixed(1),
    })
  }

  render() {
    const { rating } = this.state
    let color = null
    if (rating <= 3) {
      color = 'ratingRed'
    } else if (rating >= 3 && rating <= 5) {
      color = 'ratingOrange'
    } else if (rating >= 5 && rating <= 7) {
      color = 'ratingYellow'
    } else {
      color = 'ratingGreen'
    }

    return (
      <div>
        <div className={color} />
        <div className="numberRating">{rating}</div>
        <Rate allowHalf defaultValue={0} className="rate" onChange={this.clickAddRating} />
      </div>
    )
  }
}
