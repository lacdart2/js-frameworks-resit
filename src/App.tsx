import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/GameDetailPage';
import GenresPage from './pages/GenresPage';
import FavouritesPage from './pages/FavouritesPage.tsx';
import NotFoundPage from './pages/NotFoundPage';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="games/:id" element={<GameDetailPage />} />
            <Route path="genres" element={<GenresPage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}