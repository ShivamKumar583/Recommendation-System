'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

interface Movie {
  id: number
  title: string
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Movie[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        // TODO: Replace with your actual API call
        const response = await fetch(`/api/suggestions?query=${encodeURIComponent(query)}`)
        const data = await response.json()
        setSuggestions(data)
        setShowSuggestions(true)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
      setSuggestions( [
        {
          id: 1,
          title: "Harry Potter and the Philosopher's Stone",
          // releaseDate: "2010-07-16",
          // genre: "Science Fiction",
          // posterUrl: "https://example.com/inception.jpg"
        },
        {
          id: 2,
          title: "Harry Potter and the Chamber of Secrets",
          // releaseDate: "2008-07-18",
          // genre: "Action",
          // posterUrl: "https://example.com/dark-knight.jpg"
        },
        {
          id: 3,
          title: "Harry Potter and the Goblet of Fire",
          // releaseDate: "2014-11-07",
          // genre: "Science Fiction",
          // posterUrl: "https://example.com/interstellar.jpg"
        },
        {
          id: 4,
          title: "Harry Potter and the Order of the Phoenix",
          // releaseDate: "1999-03-31",
          // genre: "Action",
          // posterUrl: "https://example.com/matrix.jpg"
        },
        {
          id: 5,
          title: "Harry Potter and the Half-Blood Prince",
          // releaseDate: "1999-03-31",
          // genre: "Action",
          // posterUrl: "https://example.com/matrix.jpg"
        },
        {
          id: 6,
          title: "Harry Potter 7",
          // releaseDate: "1999-03-31",
          // genre: "Action",
          // posterUrl: "https://example.com/matrix.jpg"
        }
      ]
      )
    }

    const debounce = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleSearch = async () => {
    // TODO: Replace with your actual API call
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
    const data = await response.json()
    console.log(data) // Handle the search results as needed
    setShowSuggestions(false)
  }

  return (
    <div className="relative">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow bg-gray-900 border-purple-500 text-white placeholder-gray-400"
        />
        <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
      {showSuggestions && (
  <Command className="absolute  mt-2 bg-gray-900 text-purple-500 border border-purple-500 rounded-md overflow-hidden max-h-60 overflow-y-auto w-full h-auto z-10">
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        {suggestions.map((movie) => (
          <CommandItem
            key={movie.id}
            onSelect={() => {
              setQuery(movie.title)
              setShowSuggestions(false)
            }}
            className="cursor-pointer text-purple-500 hover:bg-purple-700 py-2 px-4 text-lg"
          >
            {movie.title}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  </Command>
)}

    </div>
  )
}

