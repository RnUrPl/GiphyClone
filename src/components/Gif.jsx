import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const Gif = ({ gif, hover = true }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Link to={`/${gif.type}s/${gif.slug}`}>
      <div className='w-full aspect-video mb-2 relative bg-png-pattern cursor-pointer group'>

        {!loaded && (
          <div className='absolute inset-0 flex items-center justify-center rounded bg-gray-900'>
            <Loader />
          </div>
        )}

        <img
          src={gif?.images?.fixed_width.webp}
          alt={gif.title}
          onLoad={() => setLoaded(true)}
          className={`w-full object-cover rounded transition-all duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {hover && loaded && (
          <div className='absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent via-transparent to-black text-white font-bold flex items-end gap-2 p-2'>
            <img
              src={gif?.user?.avatar_url}
              alt={gif?.user?.display_name}
              className='h-8'
            />
            <span>{gif?.user?.display_name}</span>
          </div>
        )}

      </div>
    </Link>
  )
}

export default Gif