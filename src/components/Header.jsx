import React, { useEffect, useState } from 'react'
import { HiEllipsisVertical, HiMiniBars3BottomRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { GifState } from '../context'

const Header = () => {

    const [categories, setCategories] = useState()
    const [showCategories, setShowCategories] = useState(false)

    const {giphy, gifs, setGifs, filter, setFilter, fav} = GifState()

    const fetchCategories = async () =>  {
      const {data} = await giphy.categories()
      setCategories(data)
    }

    useEffect(() =>  {
      fetchCategories()
    },[])


  return (
    <nav> 
      <div className='relative flex gap-4 justify-between items-center mb-2'>

        
        <Link to = {"/"} className='flex gap-2'>
            <img src='logo.png' alt="Giphy Logo" className="w-10" />
            <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
                GIPHY
            </h1>
        </Link>
        <div className='font-bold text-md flex gap-2 items-center'>
        {categories?.slice(0,5)?.map((category) => {
          return (<Link 
            key={category.name}
            to={`/${category.name_encoded}`}
             className='px-4 py-1 transition ease-in-out hover:gradient border-b-4 hidden lg:block'>
              {category.name}
              </Link>)
        })}
        

        <button
           onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
        >
        <HiEllipsisVertical
              size={35}
              className={`py-0.5 transition ease-in-out hover:gradient ${
                showCategories ? "gradient" : ""
              } border-b-4 cursor-pointer hidden lg:block`}
            />
              
        </button>

        {fav.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favorites">Favorite</Link>
            </div>
          )}

        <button onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}>
            <HiMiniBars3BottomRight
              className={`text-black block lg:hidden hover:gradient ${  showCategories ? "gradient" : ""}`}
              size={30}
            />
          </button>
        </div>

        

        {showCategories && 
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className='text-3xl font-extrabold'>Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5"/>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => {
                return (<Link 
                 onClick={() => setShowCategories(false)}
                    className="transition ease-in-out font-bold"
                key={category.name}
                to={`/${category.name_encoded}`}
                >
                  {category.name}
                  </Link>)
              })}
              
            </div>
          </div>}
       </div>
    </nav>
  )
}

export default Header