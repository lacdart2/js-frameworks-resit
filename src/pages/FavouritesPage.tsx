import { useFavourites } from '../hooks/useFavourites';
import { useToast } from '../context/ToastContext';
import GameCard from '../components/ui/GameCard';
import { HeartOff } from 'lucide-react';

export default function FavouritesPage() {
    const { favourites, isFavourite, toggleFavourite, addFavourite } = useFavourites();
    const { showToast } = useToast();

    function handleToggleFavourite(game: typeof favourites[number]) {
        toggleFavourite(game);
        showToast(`removed "${game.name}" from favourites`, 'remove', () => addFavourite(game));
    }

    return (
        <div className="flex flex-col gap-8 px-6 py-8 pb-20">

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                    Your Favourites
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {favourites.length} {favourites.length === 1 ? 'game' : 'games'} saved
                </p>
            </div>

            {favourites.length === 0 ? (
                <div className="glass-panel flex flex-col items-center gap-3 py-16 px-6  rounded-xl">
                    <HeartOff size={32} style={{ color: 'var(--text-muted)' }} />
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        you haven't saved any games yet
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5">
                    {favourites.map((game, index) => (
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
        </div>
    );
}