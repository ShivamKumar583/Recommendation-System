import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  // TODO: Replace with your actual database query or API call
  // This is a mock implementation
  const mockSuggestions = [
    { id: 1, title: "Inception" },
    { id: 2, title: "Interstellar" },
    { id: 3, title: "The Dark Knight" },
    { id: 4, title: "The Matrix" },
    { id: 5, title: "Blade Runner" },
  ].filter(movie => movie.title.toLowerCase().includes(query?.toLowerCase() ?? ''))

  return NextResponse.json(mockSuggestions)
}

