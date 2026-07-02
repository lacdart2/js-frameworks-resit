import { NavLink, Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Home, Gamepad2, Heart, Search, X } from 'lucide-react';
import { useFavourites } from '../../hooks/useFavourites';

export default function Sidebar() {
    const navigate = useNavigate();
    const { favourites } = useFavourites();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSearchValue(searchParams.get('q') || '');
    }, [searchParams]);

    function handleSearchChange(value: string) {
        setSearchValue(value);
        if (value) {
            navigate(`/?q=${encodeURIComponent(value)}`);
        } else if (location.pathname === '/') {
            navigate('/');
        }
    }

    function handleClearSearch() {
        setSearchValue('');
        navigate('/');
        inputRef.current?.focus();
    }
    return (
        <aside className="
      hidden md:flex flex-col
      fixed top-0 left-0  h-screen z-10
      w-16 lg:w-64
      border-r   border-[#1E2540]
      p-3 lg:p-5
      transition-all duration-300"
            style={{ background: 'var(--bg-sidebar)' }}
        >
            <Link to="/" className="flex items-center justify-center  lg:justify-start gap-2.5 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                >
                    <Gamepad2 size={20} style={{ color: 'var(--bg-base)' }} />
                </div>
                <div className="hidden lg:flex flex-col gap-px">
                    <h1 className="text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>
                        OldROM
                    </h1>
                    <p className="text-[9px] font-semibold uppercase" style={{ color: 'var(--accent)', opacity: 0.7, letterSpacing: '0.08em' }}>
                        retro game vault
                    </p>
                </div>
            </Link>

            {/* search, navigates to home with query param */}
            <div className="hidden lg:flex items-center gap-2 w-full  mb-6 px-3 py-2 rounded-lg border"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
                <Search size={14} style={{ color: 'var(--text-muted)' }} />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="search games..."
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: 'var(--text-primary)' }}
                />
                {searchValue && (
                    <button onClick={handleClearSearch} className="flex items-center justify-center cursor-pointer group/clear">
                        <X size={14} className="text-[var(--text-muted)] transition-colors group-hover/clear:text-[var(--accent)]" />
                    </button>
                )}
            </div>

            <p className="hidden lg:block text-xs uppercase  tracking-widest mb-2"
                style={{ color: 'var(--text-muted)' }}
            >
                navigation
            </p>

            <nav className="flex flex-col gap-1">
                {[
                    { to: '/', icon: <Home size={16} />, label: 'Home', end: true },
                    { to: '/genres', icon: <Gamepad2 size={16} />, label: 'Genres', end: false },
                ].map(({ to, icon, label, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                            justify-center lg:justify-start
                            ${isActive
                                ? 'bg-[#FB7185]/10 text-[#FB7185]'
                                : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A1F2E]'
                            }`
                        }
                    >
                        {icon}
                        <span className="hidden lg:inline">{label}</span>
                    </NavLink>
                ))}

                <NavLink
                    to="/favourites"
                    end={false}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                        justify-center lg:justify-start
                        ${isActive
                            ? 'bg-[#FB7185]/10 text-[#FB7185]'
                            : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A1F2E]'
                        }`
                    }
                >
                    <Heart size={16} />
                    <span className="hidden lg:inline">Favourites</span>
                    {favourites.length > 0 && (
                        <span className="hidden lg:flex items-center justify-center ml-auto w-5 h-5 rounded-full text-[10px] font-bold"
                            style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}
                        >
                            {favourites.length}
                        </span>
                    )}
                </NavLink>
            </nav>
        </aside>
    );
}