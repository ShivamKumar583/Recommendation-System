import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { use } from 'react'

interface Movie {
  id: number
  title: string
  rating: number
  posterUrl: string
}

interface MovieListProps {
  title?: string
  movies?: Movie[]
  moviesPromise?: Promise<Movie[]>
  isLoading?: boolean
}

export default function MovieList({ title, movies, moviesPromise, isLoading = false }: MovieListProps) {
  let movieList: Movie[] = []

  if (moviesPromise) {
    try {
      movieList = use(moviesPromise)
    } catch (error) {
      console.error('Error in MovieList:', error)
      throw error // Re-throw to be caught by ErrorBoundary
    }
  } else if (movies) {
    movieList = movies
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">{title || 'Movies'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-800 border border-purple-500 rounded-lg overflow-hidden animate-pulse">
              <div className="w-full h-64 bg-gray-700"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (movieList.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">{title || 'Movies'}</h2>
        <p className="text-gray-400">No movies found.</p>
      </div>
    )
  }

  return (
    <div>
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movieList.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <Card className="bg-gray-800 border-purple-500 overflow-hidden transform transition-all hover:scale-105">
              <Image src={movie.posterUrl} alt={movie.title} width={300} height={450} className="w-full h-64 object-cover" />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 truncate">{movie.title}</h3>
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-1 h-4 w-4" />
                  <span>{movie.rating.toFixed(1)}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

