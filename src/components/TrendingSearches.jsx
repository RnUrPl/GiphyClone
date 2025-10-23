import React, { useEffect, useState } from 'react'
import { GifState } from '../context'
import { useNavigate } from 'react-router-dom'
import { HiMiniArrowTrendingUp } from 'react-icons/hi2'

const TrendingSearches = () => {
    const [loading, setLaoding] = useState(false)
    const {fetchTrendingSearches} = GifState()
    const [trending, setTreding] = useState([])
    const navigate = useNavigate()

    const getTrendingSearches = async() => {
        setLaoding(true)
        try{
            let result = await fetchTrendingSearches()
            setTreding(result)
        }catch(error){
            console.error(error)
        }finally{
            setLaoding(false)
        }
    }

    useEffect(() => {
        getTrendingSearches()
    },[])

    const handleTrendClick = (term) => {
        if (!term?.trim()) return
        navigate(`/search/${term}`)
        setInputValue("")
      };
    
  return (
    <div
          className="
            flex gap-3 overflow-x-auto pb-2 
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
            scroll-smooth
          "
        >
            
          {trending.map((term, index) => (
            <span
              key={index}
              className="
                flex
                gap-2
                justify-center
                items-center
                flex-shrink-0
                flex-row
                px-4 py-2 
                bg-gray-200 
                rounded-full 
                cursor-pointer 
                hover:bg-gray-300 
                transition 
                whitespace-nowrap
              "
              onClick ={() => handleTrendClick(term)}
            >
                <HiMiniArrowTrendingUp size={20} className='text-blue-400'/>
              {term}
            </span>
          ))}
        </div>
  )
}

export default TrendingSearches