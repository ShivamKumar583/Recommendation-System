import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  // TODO: Replace with your actual database query or API call
  // This is a mock implementation
  const mockSearchResults = [
    { id: 1, title: "Inception", rating: 8.8, posterUrl: "/placeholder.svg" },
    { id: 2, title: "Interstellar", rating: 8.6, posterUrl: "/placeholder.svg" },
    { id: 3, title: "The Dark Knight", rating: 9.0, posterUrl: "/placeholder.svg" },
    { id: 4, title: "The Matrix", rating: 8.7, posterUrl: "/placeholder.svg" },
    { id: 5, title: "Blade Runner", rating: 8.1, posterUrl: "/placeholder.svg" },
  ].filter(movie => movie.title.toLowerCase().includes(query?.toLowerCase() ?? ''))

  return NextResponse.json(mockSearchResults)
}

