import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import HomePage from "./pages/HomePage";
import GifPage from "./pages/GifPage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavouritesPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search/:query", element: <SearchPage /> },

      { path: "/favorites", element: <FavoritesPage /> },
    
      { path: "/:type/:slug", element: <GifPage /> },
      { path: "/:category", element: <CategoryPage /> },
      {
        path: "*",
        element: <HomePage />,
      }
      
     
    ],
  },
  ]);

  export default router