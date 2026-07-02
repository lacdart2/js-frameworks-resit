import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Layout() {
    return (
        <div className="flex min-h-screen" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>

            <Sidebar />

            <main className="flex flex-col flex-1 h-screen overflow-y-auto
               ml-0 md:ml-16 lg:ml-64
               pb-20 md:pb-0">
                <Outlet />
            </main>

            <BottomNav />
        </div>
    );
}