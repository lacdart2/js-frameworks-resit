import { useEffect, useRef, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface SortSelectProps {
    sort: 'name' | 'year';
    onChange: (sort: 'name' | 'year') => void;
}

// dropdown for choosing sort order, manages its own open-close state 
export default function SortSelect({ sort, onChange }: SortSelectProps) {
    const [sortOpen, setSortOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    // close dropdown if clicking outside 
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
                setSortOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={sortRef} className="relative">
            <button
                onClick={() => setSortOpen((prev) => !prev)}
                className="glass-panel flex items-center gap-2  px-3 py-2 rounded-lg text-sm"
                style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
            >
                <SlidersHorizontal size={14} style={{ color: 'var(--text-muted)' }} />
                sort by {sort}
            </button>

            {sortOpen && (
                <div className="glass-panel absolute right-0 top-full mt-2 w-40 rounded-lg overflow-hidden  z-20">
                    {(['name', 'year'] as const).map((option) => (
                        <button
                            key={option}
                            onClick={() => { onChange(option); setSortOpen(false); }}
                            className="sort-option flex items-center w-full  px-3 py-2.5 text-sm text-left"
                            style={{ color: sort === option ? 'var(--accent)' : 'var(--text-primary)' }}
                        >
                            sort by {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}