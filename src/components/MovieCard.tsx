export default function MovieCard({ ...movieData }) {
  return (
    <div>
      <h2>{movieData.title}</h2>
      <p>{movieData.overview}</p>
      <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}/>
    </div>
  )
}
