import { createBrowserRouter } from "react-router-dom";
import AppUI from "./ui/AppUI";
import HomePage from "./pages/HomePage";
import GifPage from "./pages/GifPage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavouritesPage";

const router = createBrowserRouter([
    {
      element: <AppUI/>,
  
      children: [
        {
          path: "/",
          element: <HomePage/>,
        },
        {
          path: "/:type/:slug",
          element: <GifPage />,
        },
        {
          path: "/:category",
          element: <CategoryPage />,
        },
        {
          path: "/search/:query",
          element: <SearchPage />,
        },
        {
          path: "/favorites",
          element: <FavoritesPage />,
        },
      ],
    },
  ]);

  export default router