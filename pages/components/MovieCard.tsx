import { GetServerSideProps } from 'next'

interface MovieCardProps {
  movieData: {
    backdrop_path: string
    genre_ids: number[]
    id: number
    media_type: string
    original_language: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    vote_average: number
    vote_count: number
  }
}

export default function MovieCard({ movieData }: MovieCardProps) {
  console.log(movieData)
  return (
    <div>
      <h1>Movie Card</h1>
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
