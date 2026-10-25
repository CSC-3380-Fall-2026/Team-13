
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export interface FavoriteBusiness {
  id: string;
  title: string;
}

interface FavoritesContextType {
  favorites: FavoriteBusiness[];
  addFavorite: (business: FavoriteBusiness) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<FavoriteBusiness[]>([]);

  const addFavorite = (business: FavoriteBusiness) => {
    setFavorites((current) =>
      current.some((item) => item.id === business.id)
        ? current
        : [...current, business]
    );
  };

  const removeFavorite = (id: string) => {
    setFavorites((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites must be used within FavoritesProvider'
    );
  }

  return context;
}
