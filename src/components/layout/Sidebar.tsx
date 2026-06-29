import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, Heart } from 'lucide-react';

// fixed left sidebar with navigation
export default function Sidebar() {
    return (
        <aside className="flex flex-col fixed top-0 left-0 w-64 h-screen bg-[#111827] border-r border-[#1E2540] p-5">

            <div className="mb-8">
                <h1 className="text-xl font-bold text-[#FB7185]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    RetroVault
                </h1>
                <p className="text-xs mt-1 text-[#64748B]">classic games discovery</p>
            </div>

            <div className="flex items-center gap-2 w-full mb-6 px-3 py-2 bg-[#1A1F2E] rounded-lg border border-[#1E2540]">
                <span className="text-[#64748B] text-sm">🔍</span>
                <input
                    type="text"
                    placeholder="search games..."
                    className="flex-1 bg-transparent text-sm text-[#F1F5F9] placeholder-[#64748B] outline-none"
                />
            </div>

            {/* nav links */}
            <nav className="flex flex-col gap-1">
                <p className="text-xs text-[#64748B] uppercase tracking-widest mb-2">navigation</p>

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#FB7185]/10 text-[#FB7185]' : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A1F2E]'
                        }`
                    }
                >
                    <Home size={16} />
                    Home
                </NavLink>

                <NavLink
                    to="/genres"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#FB7185]/10 text-[#FB7185]' : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A1F2E]'
                        }`
                    }
                >
                    <Gamepad2 size={16} />
                    Genres
                </NavLink>

                <NavLink
                    to="/favourites"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-[#FB7185]/10 text-[#FB7185]' : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1A1F2E]'
                        }`
                    }
                >
                    <Heart size={16} />
                    Favourites
                </NavLink>
            </nav>
        </aside>
    );
}