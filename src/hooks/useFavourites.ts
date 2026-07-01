import { useState, useEffect } from 'react';
import type { Game } from '../types/game';

const STORAGE_KEY = 'oldrom_favourites';

export function useFavourites() {
    const [favourites, setFavourites] = useState<Game[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    }, [favourites]);

    function isFavourite(id: number): boolean {
        return favourites.some((g) => g.id === id);
    }

    function addFavourite(game: Game) {
        setFavourites((prev) => (prev.some((g) => g.id === game.id) ? prev : [...prev, game]));
    }

    function toggleFavourite(game: Game) {
        setFavourites((prev) =>
            prev.some((g) => g.id === game.id)
                ? prev.filter((g) => g.id !== game.id)
                : [...prev, game]
        );
    }

    return { favourites, isFavourite, toggleFavourite, addFavourite };
}