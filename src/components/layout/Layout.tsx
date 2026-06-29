import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

// main layout wrapper — sidebar left, content right
export default function Layout() {
    return (
        <div className="flex min-h-screen bg-[#0D0F18] text-[#F1F5F9]">
            <Sidebar />
            <main className="flex flex-col flex-1 ml-64 min-h-screen p-6">
                <Outlet />
            </main>
        </div>
    );
}