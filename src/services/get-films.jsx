export default class GetFilms {
  async getResource(query) {
    const urlDefault =
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200'
    const urlQuery = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
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

  async getAllFilms(query) {
    const res = await this.getResource(query)
    return res.results
  }
}
