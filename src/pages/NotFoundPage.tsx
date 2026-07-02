import { Link } from 'react-router-dom';
import { Gamepad2, Home, LayoutGrid } from 'lucide-react';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-lg mb-6"
                style={{ background: 'var(--accent)' }}
            >
                <Gamepad2 size={28} style={{ color: 'var(--bg-base)' }} />
            </div>

            <h1 className="text-6xl font-bold mb-2"
                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
                404
            </h1>

            <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                game over. no continues left.
            </p>

            <p className="text-sm max-w-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                you blew into this cartridge, smacked the console twice, and still nothing loaded.
            </p>

            <p className="text-sm max-w-sm mb-8" style={{ color: 'var(--text-muted)' }}>
                this page doesn't exist — kind of like your reflexes since 1994.
            </p>

            <div className="flex items-center gap-3">
                <Link
                    to="/"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}
                >
                    <Home size={16} />
                    respawn at home
                </Link>

                <Link
                    to="/genres"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                >
                    <LayoutGrid size={16} />
                    pick a new game
                </Link>
            </div>
        </div>
    );
}