import GameCard from './GameCard';
import type { Game } from '../../types/game';

interface GameGridProps {
    games: Game[];
    isFavourite: (id: number) => boolean;
    onToggleFavourite: (game: Game) => void;
    animKey: string;
    loading: boolean;
    error: string | null;
}

// used on Homepage's "all games" section, reusable anywhere a  game grid is needed
export default function GameGrid({ games, isFavourite, onToggleFavourite, animKey, loading, error }: GameGridProps) {
    if (error) {
        return <p className="text-sm" style={{ color: 'var(--accent)' }}>{error}</p>;
    }

    if (!loading && games.length === 0) {
        return <p className="text-sm" style={{ color: 'var(--text-muted)' }}>no games found</p>;
    }

    if (loading) {
        return null;
    }

    return (
        <div key={animKey} className="grid grid-cols-2 gap-4  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {games.map((game, index) => (
                <div key={game.id} className="card-stagger" style={{ animationDelay: `${Math.min(index * 80, 1200)}ms` }}>
                    <GameCard
                        game={game}
                        isFavourite={isFavourite(game.id)}
                        onToggleFavourite={onToggleFavourite}
                    />
                </div>
            ))}
        </div>
    );
}