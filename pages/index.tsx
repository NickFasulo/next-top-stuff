import Head from 'next/head'
import { GetServerSideProps } from 'next'

interface HomePageProps {
  movieData: {
  }
}

export default function Home({ movieData }: HomePageProps) {
  console.log(movieData)
  return (
    <div>
      <Head>
        <title>Top Stuff</title>
        <meta name='description' content='Top Stuff' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Top Stuff</h1>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=' + process.env.TMDB_KEY
  )
  const movieData = await res.json()

  return {
    props: {
      movieData
    }
  }
}
