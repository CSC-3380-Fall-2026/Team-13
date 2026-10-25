
import React from 'react';
import SearchScreen from './src/screens/SearchScreen';
import { FavoritesProvider } from './src/context/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <SearchScreen />
    </FavoritesProvider>
  );
}
