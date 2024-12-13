import { NextResponse } from 'next/server'

const mockMovieDatabase = [
  {
    id: '1',
    title: 'Inception',
    rating: 8.8,
    posterUrl: '/placeholder.svg',
    overview: 'A thief who enters the dreams of others to steal secrets from their subconscious.',
    runtime: 148,
    releaseYear: 2010,
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page', 'Tom Hardy'],
    genres: ['Action', 'Adventure', 'Sci-Fi']
  },
  {
    id: '2',
    title: 'The Matrix',
    rating: 8.7,
    posterUrl: '/placeholder.svg',
    overview: 'A computer programmer discovers that reality as he knows it is a simulation created by machines.',
    runtime: 136,
    releaseYear: 1999,
    director: 'The Wachowskis',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving'],
    genres: ['Action', 'Sci-Fi']
  },
  {
    id: '3',
    title: 'Interstellar',
    rating: 8.6,
    posterUrl: '/placeholder.svg',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    runtime: 169,
    releaseYear: 2014,
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    genres: ['Adventure', 'Drama', 'Sci-Fi']
  }
]

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const movie = mockMovieDatabase.find(m => m.id === id)

  if (!movie) {
    return new NextResponse('Movie not found', { status: 404 })
  }

  return NextResponse.json(movie)
}

