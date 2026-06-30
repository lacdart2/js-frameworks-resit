import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GameCard from './GameCard';
import type { Game } from '../../types/game';

interface GameRowProps {
    title: string;
    games: Game[];
    isFavourite: (id: number) => boolean;
    onToggleFavourite: (game: Game) => void;
    autoScroll?: boolean;
}

// reusable horizontal scrolling row with auto-scroll
export default function GameRow({ title, games, isFavourite, onToggleFavourite, autoScroll = false }: GameRowProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const stoppedRef = useRef(false);

    useEffect(() => {
        if (!autoScroll) return;
        const track = trackRef.current;
        if (!track) return;

        const interval = setInterval(() => {
            if (stoppedRef.current) return;
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: 1, behavior: 'auto' });
            }
        }, 30);

        const timeout = setTimeout(() => clearInterval(interval), 18000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [autoScroll]);

    function stopAutoScroll() {
        stoppedRef.current = true;
    }

    function scrollByAmount(amount: number) {
        stopAutoScroll();
        trackRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
    }

    if (games.length === 0) return null;

    return (
        <section
            className="flex flex-col gap-3 px-6 group/row"
            onMouseEnter={stopAutoScroll}
            onTouchStart={stopAutoScroll}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                    {title}
                </h2>

                <div className="hidden md:flex items-center gap-2 opacity-0  group-hover/row:opacity-100 transition-opacity">
                    <button
                        onClick={() => scrollByAmount(-300)}
                        className="row-arrow flex items-center justify-center w-7 h-7 rounded-full"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    <button
                        onClick={() => scrollByAmount(300)}
                        className="row-arrow flex items-center justify-center w-7 h-7 rounded-full"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            <div
                ref={trackRef}
                onMouseDown={stopAutoScroll}
                className="flex gap-3 pb-2 overflow-x-auto  fade-edges"
                style={{ scrollbarWidth: 'none' }}
            >
                {games.map((game) => (
                    <div key={game.id} className="flex-shrink-0 w-40">
                        <GameCard
                            game={game}
                            isFavourite={isFavourite(game.id)}
                            onToggleFavourite={onToggleFavourite}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}