import React, { useState } from 'react'
import { HiEllipsisVertical, HiMiniBars3BottomRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const Header = () => {

    const [categories, setCategories] = useState()
    const [showCategories, setShowCategories] = useState(false)
  return (
    <nav> 
        <div className='flex gap-4 justify-between items-center mb-2'>

        
        <Link to = {"/"} className='flex gap-2'>
            <img src='logo.png' alt="Giphy Logo" className="w-10" />
            <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
                GIPHY
            </h1>
        </Link>

        <Link to={"/favorites"} className='px-4 py-1 transition ease-in-out hover:gradient border-b-4 hidden lg:block'>Favourites</Link>

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

        <button onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}>
            <HiMiniBars3BottomRight
              className={`text-black block lg:hidden hover:gradient ${  showCategories ? "gradient" : ""}`}
              size={30}
            />
          </button>
        </div>
    </nav>
  )
}

export default Header