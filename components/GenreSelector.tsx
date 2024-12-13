'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const genres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
]

export default function GenreSelector() {
  const [selectedGenre, setSelectedGenre] = useState('')

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value)
    // TODO: Replace with your actual API call to fetch movies by genre
    fetch(`/api/movies?genre=${value}`)
      .then(response => response.json())
      .then(data => console.log(data)) // Handle the genre-based movies as needed
  }

  return (
    <Select onValueChange={handleGenreChange}>
      <SelectTrigger className="w-full bg-gray-900 border-purple-500 text-white">
        <SelectValue placeholder="Select a genre" />
      </SelectTrigger>
      <SelectContent className="bg-gray-900 border-purple-500 text-white">
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre} className="hover:bg-purple-700">
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

