import { useEffect, useState } from 'react';
import { getAllGames } from '../api/gamesApi';
import { useFavourites } from '../hooks/useFavourites';
import { useToast } from '../context/ToastContext';
import GameCard from '../components/ui/GameCard';
import GenreTag from '../components/ui/GenreTag';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { Game } from '../types/game';
import { Swords, GraduationCap, Puzzle, Car, Wand2, Cpu, Crown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// maps known genre names to a related lucide icon, and falls back to Tag
const GENRE_ICONS: Record<string, LucideIcon> = {
    'Action': Swords,
    'Educational': GraduationCap,
    'Puzzle': Puzzle,
    'Racing / Driving': Car,
    'Role-Playing (RPG)': Wand2,
    'Simulation': Cpu,
    'Strategy': Crown,
};

export default function GenresPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    const { isFavourite, toggleFavourite, addFavourite } = useFavourites();
    const { showToast } = useToast();

    useEffect(() => {
        getAllGames()
            .then(setGames)
            .catch(() => setError('failed to load games, please try again later'))
            .finally(() => setLoading(false));
    }, []);

    function handleToggleFavourite(game: Game) {
        const wasFavourite = isFavourite(game.id);
        toggleFavourite(game);
        showToast(
            wasFavourite ? `removed "${game.name}" from favourites` : `added "${game.name}" to favourites`,
            wasFavourite ? 'remove' : 'add',
            wasFavourite ? () => addFavourite(game) : undefined
        );
    }

    const genreCounts = games.reduce<Record<string, number>>((acc, game) => {
        game.genre.forEach((g) => {
            acc[g] = (acc[g] || 0) + 1;
        });
        return acc;
    }, {});

    const genres = Object.keys(genreCounts).sort();

    // falls back to the first genre until the user clicks on another genre card
    const activeGenre = selectedGenre ?? genres[0] ?? null;

    const filteredGames = activeGenre
        ? games.filter((g) => g.genre.includes(activeGenre))
        : [];

    if (loading) return <LoadingSpinner />;

    return (
        <div className="flex flex-col gap-8 px-6 py-8 pb-20">

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                    Browse By Genre
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    select a genre to explore its games
                </p>
            </div>

            {error && (
                <p className="text-sm" style={{ color: 'var(--accent)' }}>{error}</p>
            )}

            {!error && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {genres.map((genre) => (
                        <GenreTag
                            key={genre}
                            genre={genre}
                            count={genreCounts[genre]}
                            active={activeGenre === genre}
                            icon={GENRE_ICONS[genre]}
                            onClick={() => setSelectedGenre(genre)}
                        />
                    ))}
                </div>
            )}

            {activeGenre && (
                <div className="flex flex-col gap-4">
                    <h2 className="text-base font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                        {activeGenre} Games
                    </h2>

                    {filteredGames.length === 0 ? (
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>no games found for this genre</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5">
                            {filteredGames.map((game) => (
                                <GameCard
                                    key={game.id}
                                    game={game}
                                    isFavourite={isFavourite(game.id)}
                                    onToggleFavourite={handleToggleFavourite}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}