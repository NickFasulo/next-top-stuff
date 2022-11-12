import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { InferGetServerSidePropsType } from 'next'
import MovieCard from '../components/MovieCard'
import { Movie } from '../types/Movie.types'
import { Container } from '@chakra-ui/react'

export default function Home({
  movieData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [movies, setMovies] = useState<Movie[]>(movieData)

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

      <Container display='flexWrap'>
        {movies.map(({ ...movieData }) => (
          <MovieCard
            key={movieData.id + 1}
            backdrop_path={movieData.backdrop_path}
            genre_ids={movieData.genre_ids}
            id={movieData.id}
            original_language={movieData.original_language}
            overview={movieData.overview}
            popularity={movieData.popularity}
            poster_path={movieData.poster_path}
            title={movieData.title}
            vote_average={movieData.vote_average}
          />
        ))}
      </Container>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=' +
      process.env.TMDB_KEY
  )
  const data = await res.json()
  const movieData = data.results as Movie[]

  return {
    props: {
      movieData
    }
  }
}
