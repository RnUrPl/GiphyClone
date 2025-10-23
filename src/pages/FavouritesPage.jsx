import {useEffect, useState} from "react";
import { GifState } from "../context";
import Gif from "../components/Gif";
import Loader from '../components/Loader'


const FavoritesPage = () => {
  const {giphy, fav} = GifState();
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchFavoriteGIFs = async () => {
    const {data: gifs} = await giphy.gifs(fav);
    setFavoriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, []);

  return (
    <>
    {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader/>
          </div>
        ) : (
    <div className="mt-2">
      <span className="faded-text ">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoriteGIFs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
     )}
    </>
  )
}

export default FavoritesPage;