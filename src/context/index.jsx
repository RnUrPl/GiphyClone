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

    

    const fetchSuggestion = async (query) => {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search/tags?api_key=${import.meta.env.VITE_GIPHY_API}&q=${query}&limit=5`
        )
        if (!response.ok) {
          throw new Error("Cant Fetch Suggestions");
        }
        const result = await response.json();
        return result.data;
      }

      const fetchTrendingSearches = async () => {
        const response = await fetch(
          `https://api.giphy.com/v1/trending/searches?api_key=${import.meta.env.VITE_GIPHY_API}&limit=5`
        )
        if (!response.ok) {
          throw new Error("Cant fetch Trending Searches");
        }
        const result = await response.json();
        return result.data;
      }
 

    useEffect(() => {
        const fav = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
        setFav(fav);
      }, []);

    const giphy = new GiphyFetch(import.meta.env.VITE_GIPHY_API)

   

    return <GifContext.Provider value={{giphy, gifs, setGifs, filter, setFilter, fav,addToFav, fetchSuggestion, fetchTrendingSearches}}>{children}</GifContext.Provider>
}

export const GifState = () =>{
    return useContext(GifContext)
}

export default GifProvider