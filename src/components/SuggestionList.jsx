import React, { useEffect, useState } from 'react'
import { GifState } from '../context'
import { useNavigate } from 'react-router-dom'
import { HiMiniArrowTrendingUp } from 'react-icons/hi2'

const SuggestionList = (query) => {
    const [loading, setLoading] = useState(false)
   const {fetchSuggestion} = GifState()
    const navigate = useNavigate()
   const [suggestions, setSuggestions] = useState([])

    const getSuggestions = async (query) => {
    
      setLoading(true);
      try {
        let result = await fetchSuggestion(query)
        setSuggestions(result)
      } catch(error) {
        console.error(error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    };

    useEffect(() => {
      getSuggestions(query)
    },[query])
   

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
        <React.Fragment>
            { console.log(suggestions)}
          {suggestions.map((term, index) => {
             return (
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
              {term}
            </span>
          )})}
          </React.Fragment>
        </div>
  )
}

export default SuggestionList