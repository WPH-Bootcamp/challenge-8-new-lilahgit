import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/detail/:id' element={<DetailPage />} />
      <Route path='/favorites' element={<FavoritesPage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;