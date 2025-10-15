import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context'
import Filter from '../components/Filter'
import Gif from '../components/Gif'

const SearchPage = () => {
  const[searchResults, setSearchResults] = useState([])
  const {query} = useParams()
  const [loading, setLoading] = useState(false)

  const{giphy, filter} = GifState()


  const fetchSearchResults = async () => {
    setLoading(true)
    try {
      const { data } = await giphy.search(query, {
        sort: "relevant",
        lang: "en",
        type: filter,
        limit: 20,
      })
      setSearchResults(data)
    } catch (error) {
      console.error("Error: cannot load Gifs", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSearchResults()
  },[filter, query])


  return (
    <div>
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <Filter alignLeft={true}/>
      {searchResults.length > 0 ? (
         <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
         {searchResults.map((gif) => (
           <Gif gif={gif} key={gif.id} />
         ))}
       </div>
      ) : (
      <span>
      No GIFs found for {query}. Try searching for Stickers instead?
    </span>
)}
    </div>
  )
}

export default SearchPage