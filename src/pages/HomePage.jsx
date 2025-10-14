import React, { useEffect } from 'react'
import Gif from '../components/Gif'
import { GifState } from '../context'

const HomePage = () => {

  const {giphy, gifs, setGifs, filter, setFilter, fav} = GifState()


  const fetchGifs = async () =>  {
    const {data} = await giphy.trending({
      limimt: 20,
      type: filter, 
      rating: "g"
    })
    setGifs(data)
  }

   useEffect(() =>  {
        fetchGifs()
      },[filter])
  return (
    <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
      {gifs.map((gif) => {
        return <Gif gif={gif} key={gif.title}/>
      })}
    </div>
  )
}

export default HomePage