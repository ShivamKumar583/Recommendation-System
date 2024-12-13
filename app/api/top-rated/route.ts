import { NextResponse } from 'next/server'

const mockTopRatedMovies = [
  { id: 1, title: "The Shawshank Redemption", rating: 9.3, posterUrl: "/placeholder.svg" },
  { id: 2, title: "The Godfather", rating: 9.2, posterUrl: "/placeholder.svg" },
  { id: 3, title: "The Dark Knight", rating: 9.0, posterUrl: "/placeholder.svg" },
  { id: 4, title: "12 Angry Men", rating: 9.0, posterUrl: "/placeholder.svg" },
]

export async function GET() {
  // Simulate a delay to test loading state
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simulate different scenarios
  const scenario = Math.random()

  if (scenario < 0.1) {
    // 10% chance of server error
    return new NextResponse('Internal Server Error', { status: 500 })
  } else if (scenario < 0.2) {
    // 10% chance of empty response
    return NextResponse.json([])
  } else {
    // 80% chance of successful response
    return NextResponse.json(mockTopRatedMovies)
  }
}

