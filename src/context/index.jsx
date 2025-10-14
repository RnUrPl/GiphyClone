import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

const GifContext = createContext()

const GifProvider = ({children}) => {
    const [gifs, setGifs] = useState([])
    const [filter, setFilter] = useState('gifs')
    const [fav, setFav] = useState([])

    const giphy = new GiphyFetch(import.meta.env.VITE_GIPHY_API)

    return <GifContext.Provider value={{giphy, gifs, setGifs, filter, setFilter, fav}}>{children}</GifContext.Provider>
}

export const GifState = () =>{
    return useContext(GifContext)
}

export default GifProvider