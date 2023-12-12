export default class Genres {
  async getResource() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'

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

  async getGenresFilms() {
    const res = await this.getResource()
    return res
  }
}
