import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Game } from '../../types/game';

interface GameCardProps {
    game: Game;
    isFavourite: boolean;
    onToggleFavourite: (game: Game) => void;
}

export default function GameCard({ game, isFavourite, onToggleFavourite }: GameCardProps) {
    return (
        <div className="glass-card relative  flex flex-col h-full rounded-xl overflow-hidden group">
            <Link to={`/games/${game.id}`}>
                <div className="relative w-full h-48 overflow-hidden">
                    <img
                        src={game.image.url}
                        alt={game.image.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1A1F2E] to-transparent" />
                </div>
            </Link>

            <div className="flex flex-col gap-2 p-3 flex-1">
                <Link to={`/games/${game.id}`}>
                    <h3 className="text-sm font-semibold leading-tight hover:text-[#FB7185] transition-colors line-clamp-1"
                        style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}
                    >
                        {game.name}
                    </h3>
                </Link>

                {/* year + genres row */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--bg-hover)', color: 'var(--text-muted)' }}
                    >
                        {game.released}
                    </span>
                    {game.genre.slice(0, 2).map((g) => (
                        <span key={g} className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                        >
                            {g}
                        </span>
                    ))}
                </div>

                <button
                    onClick={() => onToggleFavourite(game)}
                    className="flex items-center gap-1.5 mt-1 w-fit text-xs transition-colors"
                    style={{ color: isFavourite ? 'var(--accent)' : 'var(--text-muted)' }}
                >
                    <Heart
                        size={14}
                        fill={isFavourite ? 'var(--accent)' : 'none'}
                        stroke={isFavourite ? 'var(--accent)' : 'var(--text-muted)'}
                    />
                    {isFavourite ? 'saved' : 'save'}
                </button>
            </div>
        </div>
    );
}