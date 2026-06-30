import { useState, useEffect } from 'react';
import type { Game } from '../types/game';

const STORAGE_KEY = 'oldrom_favourites';

export function useFavourites() {
    // load from localStorage on first render
    const [favourites, setFavourites] = useState<Game[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // save to localStorage every time favourites changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    }, [favourites]);

    // check if a game is already a favourite
    function isFavourite(id: number): boolean {
        return favourites.some((g) => g.id === id);
    }

    // add or remove a game from favourites
    function toggleFavourite(game: Game) {
        setFavourites((prev) =>
            isFavourite(game.id)
                ? prev.filter((g) => g.id !== game.id)
                : [...prev, game]
        );
    }

    return { favourites, isFavourite, toggleFavourite };
}