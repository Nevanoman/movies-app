export default class Rating {
  async getRatedMovies(idSession) {
    const url = `https://api.themoviedb.org/3/guest_session/${idSession}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWQyNDY5NjY1NDNlZWU1NDdlNDNkNjVlMzQzYzQ4YSIsInN1YiI6IjY1NjQ1ODIxNzA2ZTU2MDBhY2YxMjk5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.77MjFJ2XUyOsTtx3-BYuA4tprBvkN3ONQ-mTb7ugoC8',
        Accept: 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`)
    }

    return await res.json()
  }

  async geRatedFilms(idSession) {
    const res = await this.getRatedMovies(idSession)
    // eslint-disable-next-line no-console
    console.log(res)
    return res
  }
}
