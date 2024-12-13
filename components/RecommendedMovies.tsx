import { Suspense } from 'react'
import MovieList from './MovieList'

interface Movie {
  id: number
  title: string
  rating: number
  posterUrl: string
}

async function getRecommendedMovies(): Promise<Movie[]> {
  // TODO: Replace with your actual API call
  // This is a mock implementation
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  return [
    { id: 4, title: "Blade Runner 2049", rating: 8.0, posterUrl: "/placeholder.svg" },
    { id: 5, title: "Ex Machina", rating: 7.7, posterUrl: "/placeholder.svg" },
    { id: 6, title: "The Fifth Element", rating: 7.6, posterUrl: "/placeholder.svg" },
    { id: 7, title: "Arrival", rating: 7.9, posterUrl: "/placeholder.svg" },
  ]
}

export default function RecommendedMovies() {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Movies Recommended for You</h2>
      <Suspense fallback={<MovieList isLoading={true} />}>
        <RecommendedMoviesContent />
      </Suspense>
    </div>
  )
}

async function RecommendedMoviesContent() {
  const recommendedMovies = await getRecommendedMovies()
  return <MovieList movies={recommendedMovies} />
}

