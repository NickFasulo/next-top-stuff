export default function MovieCard({ ...movieData }) {
  return (
    <div>
      <h2>{movieData.title}</h2>
      <p>{movieData.overview}</p>
    </div>
  )
}
