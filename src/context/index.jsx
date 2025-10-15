import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext()

const GifProvider = ({children}) => {
    const [gifs, setGifs] = useState([])
    const [filter, setFilter] = useState('gifs')
    const [fav, setFav] = useState([])

    const addToFav = (id) => {
        if(fav.includes(id)) {
            const updated = fav.filter((itemId) => itemId !==id)
            localStorage.setItem('favouriteGIFs', JSON.stringify(updated))
            setFav(updated)
        }else {
            // If the item is not in favorites, add it
            const updated = [...fav];
            updated.push(id);
            localStorage.setItem("favoriteGIFs", JSON.stringify(updated));
            setFav(updated);
          }
    }

    useEffect(() => {
        const fav = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
        setFav(fav);
      }, []);

    const giphy = new GiphyFetch(import.meta.env.VITE_GIPHY_API)

    return <GifContext.Provider value={{giphy, gifs, setGifs, filter, setFilter, fav,addToFav}}>{children}</GifContext.Provider>
}

export const GifState = () =>{
    return useContext(GifContext)
}

export default GifProvider