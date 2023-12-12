export default class GetFilms {
  async getResource(query, page) {
    const urlDefault = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`
    const urlQuery = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
    const urlNew = query !== undefined ? urlQuery : urlDefault

    const res = await fetch(urlNew, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWQyNDY5NjY1NDNlZWU1NDdlNDNkNjVlMzQzYzQ4YSIsInN1YiI6IjY1NjQ1ODIxNzA2ZTU2MDBhY2YxMjk5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.77MjFJ2XUyOsTtx3-BYuA4tprBvkN3ONQ-mTb7ugoC8',
        accept: 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`)
    }

    return await res.json()
  }

  async getAllFilms(query, page) {
    const res = await this.getResource(query, page)

    return res.results
  }

  async findMovieById(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWQyNDY5NjY1NDNlZWU1NDdlNDNkNjVlMzQzYzQ4YSIsInN1YiI6IjY1NjQ1ODIxNzA2ZTU2MDBhY2YxMjk5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.77MjFJ2XUyOsTtx3-BYuA4tprBvkN3ONQ-mTb7ugoC8',
        accept: 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`)
    }

    return await res.json()
  }

  async getMovies(arrId) {
    const movies = await Promise.all(arrId.map((id) => this.findMovieById(id)))
    return movies
  }
}
