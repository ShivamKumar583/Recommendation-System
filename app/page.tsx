'use client' // Add this to mark the component as a Client Component

import { Suspense, useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import GenreSelector from '../components/GenreSelector'
import MovieList from '../components/MovieList'
import RecommendedMovies from '../components/RecommendedMovies'
import TopRatedByGenre from '../components/TopRatedByGenre'
import { ErrorBoundary } from 'react-error-boundary'

async function getTopRatedMovies() {
  try {
    const res = await fetch('http://localhost:3000/api/top-rated', { next: { revalidate: 3600 } })
    if (!res.ok) {
      throw new Error(`Failed to fetch top rated movies: ${res.status} ${res.statusText}`)
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching top rated movies:', error)
    throw error // Re-throw the error to be caught by the ErrorBoundary
  }
}

function TopRatedMovies() {
  const topRatedMoviesPromise = getTopRatedMovies()

  return (
    <Suspense fallback={<MovieList title="Top Rated Movies" isLoading={true} />}>
      <MovieList title="Top Rated Movies" moviesPromise={topRatedMoviesPromise} />
    </Suspense>
  )
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="text-red-500 p-4 bg-red-100 rounded-md">
      <h2 className="text-xl font-bold mb-2">Something went wrong:</h2>
      <p className="mb-2">{error.message}</p>
      <button 
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Personalized Movie Recommender
      </h1>
      <div className="max-w-6xl mx-auto space-y-12">
        <SearchBar />
        <RecommendedMovies />
        <GenreSelector />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <TopRatedMovies />
        </ErrorBoundary>
        <TopRatedByGenre />
      </div>
    </div>
  )
}
