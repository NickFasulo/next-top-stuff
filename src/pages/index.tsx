import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType } from 'next'
import { useState, useEffect } from 'react'
import { Wrap, Box } from '@chakra-ui/react'
import { Movie } from '../types/Movie.types'
import MovieCard from '../components/MovieCard'
import CustomSpinner from '../components/CustomSpinner'

export default function Home({
  movieData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [movies, setMovies] = useState<Movie[]>(movieData)
  const [loading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    if (movieData) {
      setLoading(false)
      setMovies(movieData)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Top Stuff</title>
        <meta name='description' content='Top Stuff' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box height='100vh'>
        <Wrap justify='center'>
          {loading ? (
            <CustomSpinner />
          ) : (
            movies.map(({ ...movieData }, i) => (
              <MovieCard
                key={i}
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
            ))
          )}
        </Wrap>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_KEY}`
  )
  const data = await res.json()
  const movieData = data.results

  return {
    props: {
      movieData
    }
  }
}
