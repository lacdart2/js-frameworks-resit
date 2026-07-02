import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllGames } from '../api/gamesApi';
import { useFavourites } from '../hooks/useFavourites';
import { useToast } from '../context/ToastContext';
import GameRow from '../components/ui/GameRow';
import GameGrid from '../components/ui/GameGrid';
import SortSelect from '../components/ui/SortSelect';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { Game } from '../types/game';

export default function HomePage() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('q') || '';
    const [sort, setSort] = useState<'name' | 'year'>('name');

    const { isFavourite, toggleFavourite, addFavourite } = useFavourites();
    const { showToast } = useToast();

    useEffect(() => {
        getAllGames()
            .then(setGames)
            .catch(() => setError('failed to load games, try again later'))
            .finally(() => setLoading(false));
    }, []);

    function handleToggleFavourite(game: Game) {
        const wasFavourite = isFavourite(game.id);
        toggleFavourite(game);
        showToast(
            wasFavourite ? `removed "${game.name}" from favourites` : `added "${game.name}" to favourites`,
            wasFavourite ? 'remove' : 'add',
            wasFavourite
                ? () => {
                    addFavourite(game);
                    showToast(`added "${game.name}" back to favourites`, 'add');
                }
                : undefined
        );
    }

    const filtered = games.filter((g) =>
        g.name.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
        if (sort === 'name') return a.name.localeCompare(b.name);
        return Number(a.released) - Number(b.released);
    });

    // game sections
    const featured = games.slice(0, 10);
    const newest = [...games].sort((a, b) => Number(b.released) - Number(a.released)).slice(0, 10);
    const oldest = [...games].sort((a, b) => Number(a.released) - Number(b.released)).slice(0, 10);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2  px-6 py-8 sticky top-0 z-10"
                style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)' }}
            >
                <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                    your classic games library
                </p>
                <h1 className="text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Discover Old<br />
                    <span style={{ color: 'var(--accent)' }}>ROM</span> Games
                </h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                    browse, save and explore the greatest retro games ever made
                </p>
            </div>
            {loading && <LoadingSpinner />}

            {!loading && !search && (
                <>
                    <GameRow
                        title="Featured Games"
                        games={featured}
                        isFavourite={isFavourite}
                        onToggleFavourite={handleToggleFavourite}
                        autoScroll
                    />

                    <GameRow
                        title="Newest Releases"
                        games={newest}
                        isFavourite={isFavourite}
                        onToggleFavourite={handleToggleFavourite}
                    />

                    <GameRow
                        title="Oldest Classics"
                        games={oldest}
                        isFavourite={isFavourite}
                        onToggleFavourite={handleToggleFavourite}
                    />
                </>
            )}
            {/* all games */}
            <section className="flex flex-col gap-4 px-6  pb-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {search ? (
                            <>Results for "<span style={{ color: 'var(--accent)' }}>{search}</span>"</>
                        ) : (
                            'All Games'
                        )}
                    </h2>
                    <SortSelect sort={sort} onChange={setSort} />
                </div>

                <GameGrid
                    games={sorted}
                    isFavourite={isFavourite}
                    onToggleFavourite={handleToggleFavourite}
                    animKey={sort}
                    loading={loading}
                    error={error}
                />
            </section>
        </div>
    );
}