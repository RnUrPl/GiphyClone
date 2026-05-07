import React, { useEffect, useState } from 'react'
import Gif from '../components/Gif'
import { GifState } from '../context'
import Filter from '../components/Filter'
import Loader from '../components/Loader'
import TrendingSearches from '../components/TrendingSearches'

const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const {giphy, gifs, setGifs, filter, setFilter, fav} = GifState()
  const [offset, setOffset] = useState(0)
const [fetchingMore, setFetchingMore] = useState(false)



  const fetchGifs = async (append = false) => {
  append ? setFetchingMore(true) : setLoading(true)

  try {
    const { data } = await giphy.trending({
      limit: 20,
      offset,
      type: filter,
      rating: "g",
    })

    if (append) {
      setGifs((prev) => [...prev, ...data])
    } else {
      setGifs(data)
    }
  } catch (error) {
    console.error(error)
  } finally {
    append ? setFetchingMore(false) : setLoading(false)
  }
}
  useEffect(() => {
  setOffset(0)
  fetchGifs()
}, [filter])

useEffect(() => {
  if (offset !== 0) {
    fetchGifs(true)
  }
}, [offset])

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !fetchingMore) {
        setOffset((prev) => prev + 20)
      }
    },
    { threshold: 1 }
  )

  const target = document.querySelector("#load-more")

  if (target) observer.observe(target)

  return () => observer.disconnect()
}, [fetchingMore])
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
        <div id="load-more" className="h-20 flex justify-center items-center">
          {fetchingMore && <Loader />}
        </div>
      </div>
      
      </>
    )}
  </>
  )
}

export default HomePage