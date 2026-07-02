import { Tag } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface GenreTagProps {
    genre: string;
    count: number;
    active: boolean;
    icon?: LucideIcon;
    onClick: () => void;
}

// single genre button, shows icon, name and game count, highlighted when active
export default function GenreTag({ genre, count, active, icon: Icon = Tag, onClick }: GenreTagProps) {
    return (
        <button
            onClick={onClick}
            className="glass-panel  flex flex-col items-start gap-2.5 px-4 py-4 cursor-pointer rounded-xl text-left transition-colors"
            style={{
                borderColor: active ? 'var(--accent)' : undefined,
                background: active ? 'rgba(251,113,133,0.1)' : undefined,
            }}
        >
            <Icon size={18} style={{ color: active ? 'var(--accent)' : 'var(--text-muted)' }} />
            <span className="text-sm font-semibold" style={{ color: active ? 'var(--accent)' : 'var(--text-primary)' }}>
                {genre}
            </span>
            <span className="text-xs px-2 py-0.5   rounded-full font-medium"
                style={{
                    background: active ? 'var(--accent)' : 'var(--bg-hover)',
                    color: active ? 'var(--bg-base)' : 'var(--text-secondary)',
                }}
            >
                {count} {count === 1 ? 'game' : 'games'}
            </span>
        </button>
    );
}