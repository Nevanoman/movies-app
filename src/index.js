import { createRoot } from 'react-dom/client'

import App from './components/app'

import './index.css'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)

// Ключ API
// 4ed246966543eee547e43d65e343c48a
// Ключ доступа к API
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWQyNDY5NjY1NDNlZWU1NDdlNDNkNjVlMzQzYzQ4YSIsInN1YiI6IjY1NjQ1ODIxNzA2ZTU2MDBhY2YxMjk5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.77MjFJ2XUyOsTtx3-BYuA4tprBvkN3ONQ-mTb7ugoC8

// 'https://api.themoviedb.org/3/search/keyword?query=return&page=1'
