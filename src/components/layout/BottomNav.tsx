import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, Heart } from 'lucide-react';

// bottom navigation for mobile
export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-10 flex md:hidden  items-center justify-around px-4 py-3 border-t"
            style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border)' }}
        >
            {[
                { to: '/', icon: <Home size={20} />, label: 'home', end: true },
                { to: '/genres', icon: <Gamepad2 size={20} />, label: 'genres', end: false },
                { to: '/favourites', icon: <Heart size={20} />, label: 'saved', end: false },
            ].map(({ to, icon, label, end }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1  text-xs transition-colors
            ${isActive ? 'text-[#FB7185]' : 'text-[#64748B]'}`
                    }
                >
                    {icon}
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
}