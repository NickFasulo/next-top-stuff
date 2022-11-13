import { ChakraBox } from './ChakraBox'
import { Image } from '@chakra-ui/react'

export default function MovieCard({ ...movieData }) {
  return (
    <ChakraBox
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      margin='2rem'
      width='13rem'
      height='19rem'
      boxShadow='base'
      borderRadius='1rem'
    >
      <Image
        src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
        fallbackSrc=''
        alt='movie poster'
        objectFit='cover'
        borderRadius='1rem'
      />
    </ChakraBox>
  )
}
