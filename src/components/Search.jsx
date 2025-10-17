import React, { useCallback, useEffect, useState } from 'react'
import { HiOutlineMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { GifState } from '../context'
import { debounce } from 'lodash'

const Search = () => {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const {fetchSuggestion} = GifState()
  const navigate = useNavigate()
  const dataKey = "name"
  
  const getSuggestions = async (query) => {
  
    setLoading(true);
    try {
      let result = await fetchSuggestion(query)
      setSuggestions(result)
    } catch (err) {
     
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      getSuggestionsDebounced(inputValue)
    } else {
      getSuggestionsDebounced.cancel()
      setSuggestions([])
    }
  }, [inputValue])

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  )

  const search = async() => {
    if(inputValue.trim() === "") return 
    navigate(`/search/${inputValue}`)
  } 
  
  const getHighlightedText = (text, inputValue) => {
    const parts = text.split(new RegExp(`(${inputValue})`, "gi"))
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === inputValue.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          )
        })}
      </span>
    )
  }
  const handleSearchClick = () => {
    search()
    setSuggestions([])
  }
  
  return (
    <div className="flex relative">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
        className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none"
      />
      {inputValue && (
        <button
          onClick={() => setInputValue("")}
          className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6"
        >
          <HiMiniXMark size={22} />
        </button>
      )}
      <button
        onClick={search}
        className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br"
      >
        <HiOutlineMagnifyingGlass size={35} className="-scale-x-100" />
      </button>
      {(suggestions.length > 0 && !loading ) && (
        <ul className="absolute top-full  w-full border border-gray-300 border-t-0 shadow-md rounded-b-md bg-white z-10 max-h-[150px] overflow-y-auto list-none m-0" role="listbox">
          <React.Fragment>
              {suggestions.map((suggestion, index) => {
                const currSuggestion = dataKey ? suggestion[dataKey] : suggestion
                return (
                  <li
                    key={index}
                    onClick={handleSearchClick}
                  
                    className="p-2.5 cursor-pointer hover:bg-gray-100 aria-selected:bg-gray-100"
                    id={`suggestion-${index}`}
                  >
                    {getHighlightedText(currSuggestion, inputValue)}
                  </li>
                );
              })}
    </React.Fragment>
        </ul>
      )}
    </div>
  )



    

}

export default Search