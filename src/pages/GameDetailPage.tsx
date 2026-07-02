import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Calendar, Tag, Hash } from 'lucide-react';
import { getGameById, getAllGames } from '../api/gamesApi';
import { useFavourites } from '../hooks/useFavourites';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { Game } from '../types/game';

function getDecadeLabel(year: string): string {
    const num = Number(year);
    if (isNaN(num)) return '';
    const decade = Math.floor(num / 10) * 10;
    return `${decade.toString().slice(2)}s era`;
}

export default function GameDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState<Game | null>(null);
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { isFavourite, toggleFavourite, addFavourite } = useFavourites();
    const { showToast } = useToast();

    useEffect(() => {
        if (!id) return;
        let ignore = false;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting loading state before a param-driven fetch is the correct pattern here
        setLoading(true);

        Promise.all([getGameById(Number(id)), getAllGames()])
            .then(([gameData, gamesData]) => {
                if (!ignore) {
                    setGame(gameData);
                    setAllGames(gamesData);
                }
            })
            .catch(() => {
                if (!ignore) setError('game not found');
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [id]);

    function handleToggleFavourite() {
        if (!game) return;
        const wasFavourite = isFavourite(game.id);
        toggleFavourite(game);
        showToast(
            wasFavourite ? `removed "${game.name}" from favourites` : `added "${game.name}" to favourites`,
            wasFavourite ? 'remove' : 'add',
            wasFavourite ? () => addFavourite(game) : undefined
        );
    }

    if (loading) return <LoadingSpinner />;

    if (error || !game) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-20 px-6">
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{error || 'game not found'}</p>
                <button
                    onClick={() => navigate('/')}
                    className="text-sm px-4 py-2 rounded-lg"
                    style={{ background: 'var(--bg-card)', color: 'var(--accent)' }}
                >
                    back to home
                </button>
            </div>
        );
    }

    const favourited = isFavourite(game.id);

    const similarGames = allGames
        .filter((g) => g.id !== game.id && g.genre.some((genre) => game.genre.includes(genre)))
        .slice(0, 6);

    return (
        <div className="flex flex-col pb-20">

            <div className="relative w-full h-72 md:h-96  overflow-hidden">
                <img
                    src={game.image.url}
                    alt={game.image.alt}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, var(--bg-base) 5%, transparent 60%)' }}
                />

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-5 left-6 flex items-center gap-2 text-sm px-3 py-1.5 cursor-pointer rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ background: 'rgba(13,15,24,0.75)', color: 'var(--text-primary)', border: '1px solid rgba(241,245,249,0.15)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(251,113,133,0.2)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(13,15,24,0.75)'; e.currentTarget.style.borderColor = 'rgba(241,245,249,0.15)'; }}
                >
                    <ArrowLeft size={16} />
                    back
                </button>

                <div className="absolute bottom-0 left-0 right-0 px-6 py-6">
                    <p className="text-xs uppercase tracking-widest mb-2 w-fit px-2.5 py-1 rounded-md backdrop-blur-sm"
                        style={{ color: 'var(--accent)', background: 'rgba(13,15,24,0.6)', border: '1px solid rgba(251,113,133,0.3)' }}
                    >
                        {getDecadeLabel(game.released)}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                        {game.name}
                    </h1>
                </div>
            </div>

            <div className="flex flex-col gap-6 px-6 pt-6">

                <div className="flex flex-wrap gap-4">
                    <div className="glass-panel flex items-center gap-2.5 px-4 py-2.5 rounded-lg">
                        <Calendar size={16} style={{ color: 'var(--accent)' }} />
                        <div className="flex flex-col">
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>released</span>
                            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{game.released}</span>
                        </div>
                    </div>

                    <div className="glass-panel flex items-center gap-2.5 px-4 py-2.5 rounded-lg">
                        <Tag size={16} style={{ color: 'var(--accent)' }} />
                        <div className="flex flex-col">
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>genres</span>
                            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{game.genre.join(', ')}</span>
                        </div>
                    </div>

                    <div className="glass-panel flex items-center gap-2.5 px-4 py-2.5 rounded-lg">
                        <Hash size={16} style={{ color: 'var(--accent)' }} />
                        <div className="flex flex-col">
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>game id</span>
                            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>#{game.id}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 max-w-3xl">
                    <h2 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                        About this game
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {game.description}
                    </p>
                </div>

                <button
                    onClick={handleToggleFavourite}
                    className="flex items-center gap-2  w-fit px-6 py-3 cursor-pointer rounded-lg text-sm font-medium transition-colors"
                    style={{
                        background: favourited ? 'var(--accent)' : 'var(--bg-card)',
                        color: favourited ? 'var(--bg-base)' : 'var(--text-primary)',
                        border: '1px solid var(--border)',
                    }}
                >
                    <Heart size={18} fill={favourited ? 'var(--bg-base)' : 'none'} />
                    {favourited ? 'favourited' : 'add to favourites'}
                </button>

                {similarGames.length > 0 && (
                    <div className="flex flex-col gap-3 mt-6">
                        <h2 className="text-base font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                            More games like this
                        </h2>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {similarGames.map((g) => (
                                <Link key={g.id} to={`/games/${g.id}`} className="flex-shrink-0 w-40">
                                    <div className="glass-card rounded-xl overflow-hidden">
                                        <img src={g.image.url} alt={g.image.alt} className="w-full h-32 object-cover" />
                                        <div className="p-2.5">
                                            <p className="text-sm font-medium line-clamp-1" style={{ color: 'var(--text-primary)' }}>{g.name}</p>
                                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{g.released}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}