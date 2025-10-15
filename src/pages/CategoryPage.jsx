import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context'
import Gif from '../components/Gif'
import Socials from '../components/Socials'

const CategoryPage = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState()

  const {category} = useParams()

  const {giphy} = GifState()

    const fetchResults = async () => {
      setLoading(true)
      try {
        const { data } = await giphy.gifs(category, category)
        setResults(data)
      } catch (error) {
        console.error("Error: something went wrong...", error)
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      fetchResults()
    },[category])

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {results.length > 0 && <Gif gif={results[0]}/>}
        <span className="text-gray-400 text-sm pt-2">
        Send some stickers to all your friends, and frenemies! They won't believe their eyes!
        </span>
        <Socials/>
        <div className="divider"></div>
      </div>

      <div >
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split("-").join( ' & ')} Gifs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {results.length > 0 && (
         <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {results.slice(1).map((gif) => {
              return  (
                <Gif gif = {gif} key ={gif.id}/>
              )
            })}
         </div>
      )}
      </div>

    
    </div>
  )
}

export default CategoryPage