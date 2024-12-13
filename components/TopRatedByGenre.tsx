import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MovieList from './MovieList'

interface Movie {
  id: number
  title: string
  rating: number
  posterUrl: string
}

interface GenreMovies {
  genre: string
  movies: Movie[]
}

async function getTopRatedByGenre(): Promise<GenreMovies[]> {
  // TODO: Replace with your actual API call
  // This is a mock implementation
  return [
    {
      genre: 'Action',
      movies: [
        { id: 1, title: "The Dark Knight", rating: 9.0, posterUrl: "/placeholder.svg" },
        { id: 2, title: "Inception", rating: 8.8, posterUrl: "/placeholder.svg" },
        { id: 3, title: "The Matrix", rating: 8.7, posterUrl: "/placeholder.svg" },
      ]
    },
    {
      genre: 'Drama',
      movies: [
        { id: 4, title: "The Shawshank Redemption", rating: 9.3, posterUrl: "/placeholder.svg" },
        { id: 5, title: "The Godfather", rating: 9.2, posterUrl: "/placeholder.svg" },
        { id: 6, title: "12 Angry Men", rating: 9.0, posterUrl: "/placeholder.svg" },
      ]
    },
    {
      genre: 'Sci-Fi',
      movies: [
        { id: 7, title: "Interstellar", rating: 8.6, posterUrl: "/placeholder.svg" },
        { id: 8, title: "Blade Runner 2049", rating: 8.0, posterUrl: "/placeholder.svg" },
        { id: 9, title: "The Martian", rating: 8.0, posterUrl: "/placeholder.svg" },
      ]
    },
  ]
}

export default async function TopRatedByGenre() {
  const genreMovies = await getTopRatedByGenre()

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Top Rated Movies by Genre</h2>
      <Tabs defaultValue={genreMovies[0].genre} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-900">
          {genreMovies.map((genreMovie) => (
            <TabsTrigger
              key={genreMovie.genre}
              value={genreMovie.genre}
              className="data-[state=active]:bg-purple-600"
            >
              {genreMovie.genre}
            </TabsTrigger>
          ))}
        </TabsList>
        {genreMovies.map((genreMovie) => (
          <TabsContent key={genreMovie.genre} value={genreMovie.genre}>
            <MovieList title={`Top ${genreMovie.genre} Movies`} movies={genreMovie.movies} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

