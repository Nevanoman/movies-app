import { Rate } from 'antd'
import './starRating.css'
import { Component } from 'react'

export default class StarRating extends Component {
  state = {
    rating: null,
  }

  componentDidMount() {
    this.startRating()
  }

  clickAddRating = (event) => {
    const { id, addRatingFilm } = this.props

    const rating = event * 2

    this.setState({
      rating,
    })

    localStorage.setItem(id, rating)
    addRatingFilm(id)
  }

  startRating() {
    const { voteAverage, rated } = this.props
    if (!rated) {
      this.setState({
        rating: voteAverage.toFixed(1),
      })
    } else {
      this.setState({
        rating: rated,
      })
    }
  }

  render() {
    const { rating } = this.state
    const { rated } = this.props
    let color = null
    if (rating) {
      if (rating <= 3) {
        color = 'ratingRed'
      } else if (rating >= 3 && rating <= 5) {
        color = 'ratingOrange'
      } else if (rating >= 5 && rating <= 7) {
        color = 'ratingYellow'
      } else {
        color = 'ratingGreen'
      }
    }

    return (
      <div>
        <div className={`ratin ${color}`} />
        <div className="numberRating">{rating}</div>
        <Rate allowHalf defaultValue={rated / 2 || 0} className="rate" onChange={this.clickAddRating} />
      </div>
    )
  }
}
