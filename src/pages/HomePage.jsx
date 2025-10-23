import React, { useEffect, useState } from 'react'
import Gif from '../components/Gif'
import { GifState } from '../context'
import Filter from '../components/Filter'
import Loader from '../components/Loader'
import TrendingSearches from '../components/TrendingSearches'

const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const {giphy, gifs, setGifs, filter, setFilter, fav} = GifState()



  const fetchGifs = async () =>  {
    setLoading(true)
    try {
    const {data} = await giphy.trending({
      limimt: 20,
      type: filter, 
      rating: "g"
    })
    setGifs(data)
    }catch (error) {
      console.error( error)
    }
    finally {
      setLoading(false)
    }
  }

   useEffect(() =>  {
        fetchGifs()
      },[filter])
  return (
    <>
    {loading ? (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader/>
      </div>
    ) : (
      <>
      <TrendingSearches/>
      <Filter showTrending />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => (
          <Gif gif={gif} key={gif.id || gif.title} />
        ))}
      </div>
      </>
    )}
  </>
  )
}

export default HomePage