import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Star, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MovieDetails {
  id: number
  title: string
  rating: number
  posterUrl: string
  overview: string
  runtime: number
  releaseYear: number
  director: string
  cast: string[]
  genres: string[]
}

async function getMovieDetails(id: string): Promise<MovieDetails> {
  const res = await fetch(`http://localhost:3000/api/movie/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch movie details')
  }
  return res.json()
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  let movie: MovieDetails;
  try {
    movie = await getMovieDetails(params.id)
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-6">
          <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              width={300}
              height={450}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {movie.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Star className="text-yellow-400 mr-1 h-4 w-4" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-gray-400 mr-1 h-4 w-4" />
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex items-center">
                <Calendar className="text-gray-400 mr-1 h-4 w-4" />
                <span>{movie.releaseYear}</span>
              </div>
            </div>
            <p className="text-gray-300">{movie.overview}</p>
            <div>
              <h2 className="text-xl font-semibold mb-2">Director</h2>
              <p>{movie.director}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <p>{movie.cast.join(', ')}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span key={genre} className="px-2 py-1 bg-purple-600 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

