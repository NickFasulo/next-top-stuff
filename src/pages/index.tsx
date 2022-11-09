import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'

export default function Home({ movieData }: any) {
  const [movies, setMovies] = useState<any[]>()

  useEffect(() => {
    if (movieData) {
      setMovies(movieData)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Top Stuff</title>
        <meta name='description' content='Top Stuff' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Top Stuff</h1>
        {movies?.map(({ ...movieData }) => (
          <MovieCard
            backdrop_path={movieData.backdrop_path}
            genre_ids={movieData.genre_ids}
            id={movieData.id}
            media_type={movieData.media_type}
            original_language={movieData.original_language}
            overview={movieData.overview}
            popularity={movieData.popularity}
            poster_path={movieData.poster_path}
            release_date={movieData.release_date}
            title={movieData.title}
            vote_average={movieData.vote_average}
            vote_count={movieData.vote_count}
          />
        ))}
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=' +
      process.env.TMDB_KEY
  )
  const data = await res.json()
  const movieData = data.results

  return {
    props: {
      movieData
    }
  }
}
