import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GifState } from '../context'
import Filter from '../components/Filter'
import Gif from '../components/Gif'
import Loader from '../components/Loader'
import SuggestionList from '../components/SuggestionList'
import { X } from "lucide-react"


const SearchPage = () => {
  const[searchResults, setSearchResults] = useState([])
  const {query} = useParams()
  const [loading, setLoading] = useState(false)
  const{giphy, filter} = GifState()
  const navigate = useNavigate()

    const clearSearch = () => {
    navigate("/")
    }



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
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSearchResults()
  },[filter, query])


  return (
    <div>
       <div className="flex items-center gap-3 pb-3">
        <h2 className="text-5xl font-extrabold">{query}</h2>

        <button
          onClick={clearSearch}
          className="p-2 rounded-full hover:bg-gray-800 transition"
        >
          <X size={28} />
        </button>
      </div>

      
      <Filter alignLeft={true}/>
       {loading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <Loader/>
            </div>
          ) : (
      <>
      <SuggestionList query = {query}/>
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
      </> 
       )}
    </div>
  )
}

export default SearchPage


const email = document.querySelector("#to-field")

export function validateEmailForm() {
  const emailInput = document.querySelector("#to-field")
  const mark = document.querySelector('.email-form__valid-mark')
  const topic = document.querySelector('#topic-field')
  const button = document.querySelector('.email-form__buttonh')
  const checkbox = document.querySelector('.email-form__accept-terms')
  const form = document.querySelector('form')

  checkbox.checked = false
  

  const validCheck = (email) => { 
    if(email < 4 || !email.includes("@") || email.includes(' ') || email.indexOf('@')==0 || email.indexOf('@')==email.length-1) return false
    return true
  }

  emailInput.addEventListener('input', ()=>{
    const email = emailInput.value.trim()
    const isValid = validCheck(email)

    mark.classList.toggle('hidden', !isValid)
  })

  topic.addEventListener('focus', () => {
    topic.classList.remove('email-form__input_warning') 
  })

  topic.addEventListener('blur', () => {
      if(!topic.value.trim())
      topic.classList.add('email-form__input_warning') 
  })


  checkbox.addEventListener('change' , () => {
    button.disabled = !checkbox.checked
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault
  })

  const customEvenet = new CustomEvent('email-form-submit', {
    bubbles: truwe
  })

  form.dispatchEvent(customEvenet)
}