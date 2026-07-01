import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllGames } from '../api/gamesApi';
import { useFavourites } from '../hooks/useFavourites';
import { useToast } from '../context/ToastContext';
import GameCard from '../components/ui/GameCard';
import GameRow from '../components/ui/GameRow';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { Game } from '../types/game';
import { SlidersHorizontal } from 'lucide-react';

export default function HomePage() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('q') || '';
    const [sort, setSort] = useState<'name' | 'year'>('name');
    const [animKey, setAnimKey] = useState(0);

    // to force cards animation
    useEffect(() => {
        setAnimKey((k) => k + 1);
    }, [sort]);

    const { isFavourite, toggleFavourite, addFavourite } = useFavourites();
    const { showToast } = useToast();
    const [sortOpen, setSortOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    // close sort dropdown when clicking outside of it
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
                setSortOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
            wasFavourite ? () => addFavourite(game) : undefined
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
            <section className="flex flex-col gap-4 px-6 pb-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {search ? (
                            <>Results for "<span style={{ color: 'var(--accent)' }}>{search}</span>"</>
                        ) : (
                            'All Games'
                        )}
                    </h2>

                    <div ref={sortRef} className="relative">
                        <button
                            onClick={() => setSortOpen((prev) => !prev)}
                            className="glass-panel flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                            style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
                        >
                            <SlidersHorizontal size={14} style={{ color: 'var(--text-muted)' }} />
                            sort by {sort}
                        </button>

                        {sortOpen && (
                            <div className="glass-panel absolute right-0 top-full mt-2 w-40 rounded-lg overflow-hidden z-20">
                                {(['name', 'year'] as const).map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => { setSort(option); setSortOpen(false); }}
                                        className="sort-option flex items-center w-full px-3 py-2.5 text-sm text-left"
                                        style={{ color: sort === option ? 'var(--accent)' : 'var(--text-primary)' }}
                                    >
                                        sort by {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {error && (
                    <p className="text-sm" style={{ color: 'var(--accent)' }}>{error}</p>
                )}

                {!loading && !error && sorted.length === 0 && (
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>no games found</p>
                )}

                {!loading && !error && (
                    <div key={animKey} className="grid grid-cols-2 gap-4  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {sorted.map((game, index) => (
                            <div key={game.id} className="card-stagger" style={{ animationDelay: `${Math.min(index * 80, 1200)}ms` }}>
                                <GameCard
                                    game={game}
                                    isFavourite={isFavourite(game.id)}
                                    onToggleFavourite={handleToggleFavourite}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div >
    );
}